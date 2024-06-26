import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service'; // Adjust the path as necessary
import { UpdateExerciseService } from '../update-exercise/update-exercise.service';

@Injectable({
  providedIn: 'root'
})
export class ViewStatsWeeklyService {

  private apiUrl = 'http://localhost:3000/api/users/weekly-stats';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getWeeklyStats(exerciseName: string): Observable<any> {
    const token = this.authService.getJwtToken(); // Get the JWT token from AuthService
    console.log(token)
  
    // Set the headers with the JWT token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
    });
  
    // Create the request body with the exerciseName
    const body = JSON.stringify({ exerciseName });
  
    // Make the HTTP POST request with the headers and body
    return this.http.post(this.apiUrl, body, { headers, withCredentials: true }).pipe(
      catchError(error => {
        console.error('Error getting weekly stats:', error);
        return throwError(error);
      })
    );
  }  
}
