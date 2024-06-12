import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RemoveExerciseService } from './remove-exercise.service';
import { UpdateExerciseService } from '../update-exercise/update-exercise.service';

declare var $: any; // Declare jQuery to access Semantic UI functions

@Component({
  selector: 'app-remove-exercise',
  templateUrl: './remove-exercise.component.html',
  styleUrls: ['./remove-exercise.component.scss']
})
export class RemoveExerciseComponent implements AfterViewInit, OnInit {
  deleteForm: FormGroup;
  exercises: string[] = [];
  exerciseNameToDelete: string = '';

  constructor(
    private fb: FormBuilder,
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
    $('.ui.dropdown').dropdown();
  }

  getExercises(): void {
    this.updateExerciseService.getExercises().subscribe(
      exercises => this.exercises = exercises,
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
        console.log('Exercise deleted successfully:', response);
        this.openModal('successModal');
        this.exerciseNameToDelete = ''; // Clear the selection
      },
      error => {
        console.error('Error deleting exercise:', error);
        this.openModal('errorModal');
      }
    );
    this.closeModal('confirmModal');
  }
  

  openModal(modalId: string): void {
    $(`#${modalId}`).modal('show');
  }

  closeModal(modalId: string): void {
    $(`#${modalId}`).modal('hide');
  }
}
