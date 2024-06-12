import { Component, AfterViewInit } from '@angular/core';
import { AddExerciseService } from './add-exercise.service';

declare var $: any; // Declare jQuery to access Semantic UI functions

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements AfterViewInit {
  exerciseName: string = '';

  constructor(private addExerciseService: AddExerciseService) {}

  ngAfterViewInit(): void {
    $('.ui.modal').modal();
  }

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
          this.openModal('successModal');
        },
        error => {
          console.error('Error adding exercise:', error);
          // Handle error here, e.g., display error message
          this.openModal('errorModal');
        }
      );
  }

  openModal(modalId: string): void {
    $(`#${modalId}`).modal('show');
  }

  closeModal(modalId: string): void {
    $(`#${modalId}`).modal('hide');
  }
}
