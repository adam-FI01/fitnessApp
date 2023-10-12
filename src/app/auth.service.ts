import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // Replace with your API endpoint

  constructor(private http: HttpClient) {
  }

  login(credentials: SigninCridentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => {
        // Handle the error and optionally re-throw it
        return throwError(error);
      })
    );
  }
}

interface SigninCridentials {
  username: string;
  password: string;
}