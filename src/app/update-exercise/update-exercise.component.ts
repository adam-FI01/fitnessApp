import { Component, AfterViewInit } from '@angular/core';

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
}
