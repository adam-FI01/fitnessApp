import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoveExerciseService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Existing code...

  deleteExercises(exerciseName: string): Observable<any> {
    const token = this.authService.getJwtToken(); // Get the JWT token from AuthService

    // Set the headers with the JWT token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
    });

    // Make the HTTP DELETE request with the headers and withCredentials option set to true
    return this.http.delete(`${this.apiUrl}/delete-exercise`, { headers, withCredentials: true, body: { exerciseName } }).pipe(
      catchError(error => {
        console.error('Error deleting exercises:', error);
        return throwError(error);
      })
    );
  }
}
