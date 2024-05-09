import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateExerciseService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getExercises(): Observable<any> {
    const token = this.authService.getJwtToken(); // Get the JWT token from AuthService

    // Set the headers with the JWT token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
    });

    // Make the HTTP GET request with the headers
    return this.http.get(`${this.apiUrl}/get-exercises`, { headers, withCredentials: true }).pipe(
      catchError(error => {
        console.error('Error getting exercises:', error);
        return throwError(error);
      })
    );
  }
}
