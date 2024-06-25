import { Component } from '@angular/core';
import { ViewStatsAllTimeService } from './view-stats-all-time.service';
import { UpdateExerciseService } from '../update-exercise/update-exercise.service';

declare var $: any; // Declare $ for jQuery usage

@Component({
  selector: 'app-view-stats-all-time',
  templateUrl: './view-stats-all-time.component.html',
  styleUrls: ['./view-stats-all-time.component.scss']
})
export class ViewStatsAllTimeComponent {
  exercises: string[] = [];
  selectedExercise: string = '';
  showAllTime: any[] = [];

  constructor(
    private ViewStatsAllTimeService: ViewStatsAllTimeService,
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
    this.loadAllTimeStats();
  }

  loadAllTimeStats(): void {
    if (!this.selectedExercise) return;
  
    this.ViewStatsAllTimeService.getAllTimeStats(this.selectedExercise).subscribe(data => {
      // Check if data is an array before calling .map()
      if (Array.isArray(data)) {
        this.showAllTime = data.map((item: any) => {
          const timestamp = parseInt(item._id?.substring(0, 8), 16) * 1000;
          return {
            Exercise: this.selectedExercise,
            Date: new Date(timestamp).toLocaleDateString(),
            Weight: item.weight,
            Reps: item.reps,
            Intensity: item.intensity
          };
        });
      } else {
        // Handle the case where data is not an array
        console.error('Expected data to be an array, but received:', data);
        this.showAllTime = []; // Optionally set showAllTime to an empty array or handle differently
      }
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
