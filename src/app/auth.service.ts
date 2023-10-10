import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // Replace with your API endpoint

  constructor(private http: HttpClient) {
  }

  login(credentials: SigninCridentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}

interface SigninCridentials {
  username: string;
  password: string;
}