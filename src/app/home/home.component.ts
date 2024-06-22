import { Component, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UpdateExerciseService } from '../update-exercise/update-exercise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showNavbar: boolean = true;
  exercises: string[] = [];
  @Output() exerciseSelected: string = '';
  

  constructor(private router: Router, private updateExerciseService: UpdateExerciseService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url.includes('/home');
      }
    });
  }

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    this.updateExerciseService.getExercises().subscribe(
      exercises => this.exercises = exercises,
      error => console.error('Error fetching exercises: ', error)
    );
  }

  onDropdownClick(): void {
    this.getExercises();
  }


selectExercise(exercise: string): void {
  this.exerciseSelected = exercise;
  // You can also navigate programmatically here if needed
}
}
