import { Component, AfterViewInit } from '@angular/core';
import { UpdateExerciseService } from './update-exercise.service';

declare var $: any; // Declare jQuery to access Semantic UI functions

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrls: ['./update-exercise.component.scss']
})
export class UpdateExerciseComponent {
  ngAfterViewInit() {
    $('.ui.dropdown').dropdown();
  }

  exercises: string[] | undefined;

  constructor(private updateExerciseService: UpdateExerciseService) { }

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    this.updateExerciseService.getExercises().subscribe(
      exercises => this.exercises = exercises,
      error => console.error('Error fetching exercises: ', error)
    );
  }
}
