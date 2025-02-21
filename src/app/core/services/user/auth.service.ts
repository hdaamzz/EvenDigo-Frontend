import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister, User } from '../../models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) {}

  userRegister(userData:IRegister):Observable<any>{
    return this.http.post(`${this.baseUrl}user/auth/send-otp`,userData);
  }

  verifyOTP(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}user/auth/verify-otp`, { email, otp });
  }
  userLogin(userData: ILogin): Observable<any> {
    return this.http.post(`${this.baseUrl}user/auth/sign-in`, userData, {
      withCredentials: true 
    });
  }
  checkAuthStatus(): Observable<{ isAuthenticated: boolean; user?: User }> {
    return this.http.get<{ isAuthenticated: boolean; user?: User }>(`${this.baseUrl}user/auth/status`, {
      withCredentials: true
    });
  }
  logout(): Observable<any> {
  return this.http.get(`${this.baseUrl}user/auth/logout`, {
    withCredentials: true
  });
}
  
}
