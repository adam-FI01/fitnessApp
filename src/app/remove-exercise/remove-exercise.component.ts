import { Component } from '@angular/core';
import { RemoveExerciseService } from './remove-exercise.service';
import { UpdateExerciseService } from '../update-exercise/update-exercise.service';

@Component({
  selector: 'app-remove-exercise',
  templateUrl: './remove-exercise.component.html',
  styleUrls: ['./remove-exercise.component.scss']
})
export class RemoveExerciseComponent {

  exerciseNameToDelete: string = '';
  exercises: string[] | undefined;

  constructor(private removeExerciseService: RemoveExerciseService, private updateExerciseService: UpdateExerciseService) {}

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    this.updateExerciseService.getExercises().subscribe(
      exercises => this.exercises = exercises,
      error => console.error('Error fetching exercises: ', error)
    );
  }

  confirmDeletion(): void {
    const confirmed = confirm(`Are you sure you want to delete the exercise "${this.exerciseNameToDelete}"?`);
    if (confirmed) {
      this.deleteExercise();
    }
  }

  deleteExercise(): void {
    this.removeExerciseService.deleteExercises(this.exerciseNameToDelete).subscribe(
      (response) => {
        console.log('Exercise deleted successfully:', response);
        // Optionally, perform any additional actions after deletion
      },
      (error) => {
        console.error('Error deleting exercise:', error);
      }
    );
  }
}
