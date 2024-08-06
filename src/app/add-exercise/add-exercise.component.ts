import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddExerciseService } from './add-exercise.service';
import { RemoveExerciseService } from '../remove-exercise/remove-exercise.service';
import { UpdateExerciseService } from '../update-exercise/update-exercise.service';

declare var $: any; // Declare jQuery to access Semantic UI functions

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements AfterViewInit, OnInit {
  isAdding: boolean = true;
  exerciseName: string = '';
  deleteForm: FormGroup;
  exercises: string[] = [];
  exerciseNameToDelete: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private addExerciseService: AddExerciseService,
    private removeExerciseService: RemoveExerciseService,
    private updateExerciseService: UpdateExerciseService
  ) {
    this.deleteForm = this.fb.group({
      exerciseToDelete: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getExercises();
  }

  ngAfterViewInit(): void {
    this.initializeDropdown();
    $('.ui.modal').modal();
  }

  toggleMode(): void {
    this.isAdding = !this.isAdding;
    this.initializeDropdown();
  }

  addExercise(): void {
    if (!this.exerciseName.trim()) {
      return;
    }

    this.addExerciseService.addExercise(this.exerciseName)
      .subscribe(
        () => {
          this.exerciseName = '';
          this.successMessage = 'Exercise added successfully!';
          this.openModal('successModal');
          this.getExercises(); // Refresh the exercises list
        },
        error => {
          console.error('Error adding exercise:', error);
          this.errorMessage = 'Failed to add exercise. Please try again.';
          this.openModal('errorModal');
        }
      );
  }

  getExercises(): void {
    this.updateExerciseService.getExercises().subscribe(
      exercises => {
        this.exercises = exercises;
        this.initializeDropdown(); // Ensure dropdown is re-initialized after exercises are fetched
      },
      error => console.error('Error fetching exercises: ', error)
    );
  }

  confirmDeletion(): void {
    if (this.deleteForm.valid) {
      this.exerciseNameToDelete = this.deleteForm.value.exerciseToDelete;
      this.openModal('confirmModal');
    }
  }

  deleteExerciseConfirmed(): void {
    this.removeExerciseService.deleteExercises(this.exerciseNameToDelete).subscribe(
      response => {
        this.successMessage = 'Exercise deleted successfully!';
        this.openModal('successModal');
        this.exerciseNameToDelete = ''; // Clear the selection
        this.getExercises(); // Refresh the exercises list
      },
      error => {
        console.error('Error deleting exercise:', error);
        this.errorMessage = 'Failed to delete exercise. Please try again.';
        this.openModal('errorModal');
      }
    );
    this.closeModal('confirmModal');
  }

  initializeDropdown(): void {
    setTimeout(() => {
      $('.ui.dropdown').dropdown();
    });
  }

  openModal(modalId: string): void {
    $(`#${modalId}`).modal('show');
  }

  closeModal(modalId: string): void {
    $(`#${modalId}`).modal('hide');
  }
}
