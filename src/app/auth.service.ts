import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SigninCridentials } from './login-screen/login-screen.component';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private cookie: CookieService) {}

  isTokenValid(): boolean {
    const jwtToken = this.getJwtToken();

    if (!jwtToken) {
      return false;
    }

    try {
      const tokenParts = jwtToken.split('.');
      if (tokenParts.length !== 3) {
        return false;
      }

      const payload = JSON.parse(atob(tokenParts[1]));

      const currentTimestamp = Math.floor(Date.now() / 1000);
      console.log(currentTimestamp)
      if (payload.exp < currentTimestamp) {
        console.log(currentTimestamp)
        console.log(payload.exp)
        
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  private getJwtToken(): string | null {
    // Implement the logic to retrieve the JWT token from where it's stored (e.g., cookies or local storage)
    // For example, if you are using ngx-cookie-service, you can retrieve it like this:
    return this.cookie.get('jwtToken');
  }
  

  login(credentials: SigninCridentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  signup(credentials: SigninCridentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
