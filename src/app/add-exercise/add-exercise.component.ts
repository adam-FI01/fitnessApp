import { Component } from '@angular/core';
import { AddExerciseService } from './add-exercise.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent {
  exerciseName: string = '';

  constructor(private addExerciseService: AddExerciseService) {}

  addExercise(): void {
    if (!this.exerciseName.trim()) {
      // Don't proceed if exercise name is empty
      return;
    }

    this.addExerciseService.addExercise(this.exerciseName)
      .subscribe(
        () => {
          // Clear the form after successful addition
          this.exerciseName = '';
          alert('Exercise added successfully!');
        },
        error => {
          console.error('Error adding exercise:', error);
          // Handle error here, e.g., display error message
          alert('Failed to add exercise. Please try again.');
        }
      );
  }
}
