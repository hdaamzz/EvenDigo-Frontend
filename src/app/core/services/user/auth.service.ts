import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRegister } from '../../models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) {}

  userRegister(userData:IRegister):Observable<any>{
    return this.http.post(`${this.baseUrl}user/auth/send-otp`,userData)
  }

  verifyOTP(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}user/auth/verify-otp`, { email, otp });
  }
}
