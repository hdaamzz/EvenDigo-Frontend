import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, map, throwError } from 'rxjs';
import { User } from '../../models/userModel';

interface SuccessResponse {
  success: true; 
  data: User[];
}

interface ErrorResponse {
  success: false; 
  message: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  usersList(): Observable<ApiResponse> {
    return this.http.get<User[]>(`${this.baseUrl}admin/users/all-users`, {
      withCredentials: true,
    }).pipe(
      map(users => ({
        success: true as const, 
        data: users
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'An error occurred while fetching users';
        return [{
          success: false as const, 
          message: errorMessage
        }];
      })
    );
  }
  userDetails(id: string): Observable<User> {    
    return this.http.post<User>(`${this.baseUrl}admin/users/get-details`, { userId: id }, {
      withCredentials: true,
    }).pipe(
      catchError(error => {
        console.error('Error fetching user details:', error);
        return throwError(() => new Error('Failed to fetch user details'));
      })
    );
  }

  blockUser(id:string):Observable<any>{
    return this.http.patch(`${this.baseUrl}admin/users/block-user`,{id},{
      withCredentials:true
    });
  }
  unblockUser(id:string):Observable<any>{
    return this.http.patch(`${this.baseUrl}admin/users/unblock-user`,{id},{
      withCredentials:true
    });
  }
}