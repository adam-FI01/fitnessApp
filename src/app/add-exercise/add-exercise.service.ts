import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddExerciseService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  addExercise(exerciseName: string): Observable<any> {
    const token = this.authService.getJwtToken(); // Assuming AuthService provides the JWT token
  
    // Set headers with JWT token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  
    // Define the request body with the exercise name
    const body = { exerciseName: exerciseName };
  
    // Make HTTP POST request to add the exercise
    return this.http.post<any>(`${this.apiUrl}/add-exercise`, body, { headers, withCredentials: true });
  }
  
}
