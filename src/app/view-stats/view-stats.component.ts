import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ViewStatsService } from './view-stats.service';
import { UpdateExerciseService } from '../update-exercise/update-exercise.service';

declare var $: any; // Declare $ for jQuery usage

@Component({
  selector: 'app-view-stats',
  templateUrl: './view-stats.component.html',
  styleUrls: ['./view-stats.component.scss']
})
export class ViewStatsComponent {
  exercises: string[] = [];
  selectedExercise: string = '';
  showDaily: any[] = [];

  constructor(
    private ViewStatsService: ViewStatsService,
    private updateExerciseService: UpdateExerciseService
  ) {}

  ngOnInit(): void {
    this.getExercises();
  }

  ngAfterViewInit(): void {
    this.initializeDropdown();
  }

  ngOnDestroy(): void {
    // Proper cleanup of the Semantic UI dropdown
    $('#exerciseDropdown').off('change');
  }

  initializeDropdown(): void {
    $('#exerciseDropdown').dropdown({
      onChange: (value: string) => {
        this.onExerciseChange(value);
      }
    });
  }

  onExerciseChange(value: string): void {
    this.selectedExercise = value;
    this.loadDailyStats();
  }

  loadDailyStats(): void {
    if (!this.selectedExercise) return;

    this.ViewStatsService.getDailyStats(this.selectedExercise).subscribe(data => {
      this.showDaily = data.map((item: any) => {
        const timestamp = parseInt(item._id.substring(0, 8), 16) * 1000;
        return {
          Exercise: this.selectedExercise,
          Date: new Date(timestamp).toLocaleDateString(),
          Weight: item.weight,
          Reps: item.reps,
          Intensity: item.intensity
        };
      });
    });
  }

  getExercises(): void {
    this.updateExerciseService.getExercises().subscribe(
      exercises => {
        if (Array.isArray(exercises)) {
          this.exercises = exercises.filter(exercise => exercise !== null);
          setTimeout(() => {
            $('#exerciseDropdown').dropdown('refresh'); // Refresh dropdown after data is loaded
          });
        } else {
          console.error('Received exercises is not an array:', exercises);
          this.exercises = [];
        }
      },
      error => console.error('Error fetching exercises: ', error)
    );
  }
}
