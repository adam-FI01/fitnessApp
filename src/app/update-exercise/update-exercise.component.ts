import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateExerciseService } from './update-exercise.service';

declare var $: any; // Declare jQuery to access Semantic UI functions

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrls: ['./update-exercise.component.scss']
})
export class UpdateExerciseComponent implements OnInit, AfterViewInit {
  exercises: string[] = [];
  exerciseForm: FormGroup;

  constructor(
    private updateExerciseService: UpdateExerciseService,
    private fb: FormBuilder
  ) {
    this.exerciseForm = this.fb.group({
      exercise: ['', Validators.required],
      reps: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]]
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

  onSubmit(): void {
    if (this.exerciseForm.valid) {
      const { exercise, reps, weight } = this.exerciseForm.value;
      this.updateExerciseService.updateExercise(exercise, reps, weight).subscribe(
        response => {
          console.log('Exercise updated successfully', response);
          this.exerciseForm.reset();
        },
        error => console.error('Error updating exercise:', error)
      );
    }
  }
}
