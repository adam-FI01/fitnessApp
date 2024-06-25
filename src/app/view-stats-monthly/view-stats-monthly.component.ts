import { Component } from '@angular/core';
import { ViewStatsMonthlyService } from './view-stats-monthly.service';
import { UpdateExerciseService } from '../update-exercise/update-exercise.service';

declare var $: any; // Declare $ for jQuery usage

@Component({
  selector: 'app-view-stats-monthly',
  templateUrl: './view-stats-monthly.component.html',
  styleUrls: ['./view-stats-monthly.component.scss']
})
export class ViewStatsMonthlyComponent {
  exercises: string[] = [];
  selectedExercise: string = '';
  showMonthly: any[] = [];

  constructor(
    private viewStatsMonthlyService: ViewStatsMonthlyService,
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
    this.loadMonthlyStats();
  }

  loadMonthlyStats(): void {
    if (!this.selectedExercise) return;

    this.viewStatsMonthlyService.getMonthlyStats(this.selectedExercise).subscribe(data => {
      this.showMonthly = data.map((item: any) => {
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
