import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ViewStatsWeeklyService } from './view-stats-weekly.service';
import { UpdateExerciseService } from '../update-exercise/update-exercise.service';

declare var $: any; // Declare $ for jQuery usage

@Component({
  selector: 'app-view-stats-weekly',
  templateUrl: './view-stats-weekly.component.html',
  styleUrls: ['./view-stats-weekly.component.scss']
})
export class ViewStatsWeeklyComponent implements OnInit, AfterViewInit, OnDestroy {
  exercises: string[] = [];
  selectedExercise: string = '';
  showWeekly: any[] = [];

  constructor(
    private viewStatsWeeklyService: ViewStatsWeeklyService,
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
    this.loadWeeklyStats();
  }

  loadWeeklyStats(): void {
    if (!this.selectedExercise) return;

    this.viewStatsWeeklyService.getWeeklyStats(this.selectedExercise).subscribe(data => {
      this.showWeekly = data.map((item: any) => {
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
