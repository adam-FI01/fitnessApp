import { Component, OnInit } from '@angular/core';
import { ViewStatsWeeklyService } from './view-stats-weekly.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-view-stats-weekly',
  templateUrl: './view-stats-weekly.component.html',
  styleUrls: ['./view-stats-weekly.component.scss']
})
export class ViewStatsWeeklyComponent implements OnInit {
  exercises: string[] = ['Squat', 'Bench Press', 'Deadlift']; // Add your exercises here
  selectedExercise: string = this.exercises[0];
  showWeekly: any[] = [];

  constructor(private viewStatsWeeklyService: ViewStatsWeeklyService, private homeComponent: HomeComponent) {}

  ngOnInit(): void {
    this.loadWeeklyStats();
  }

  onExerciseChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedExercise = target.value;
    this.loadWeeklyStats();
  }

  loadWeeklyStats(): void {
    this.viewStatsWeeklyService.getWeeklyStats(this.selectedExercise).subscribe(data => {
      this.showWeekly = data.map((item: { _id: string; weight: any; reps: any; intensity: any; }) => {
        const timestamp = parseInt(item._id.substring(0, 8), 16) * 1000; // Extract timestamp from ObjectId string
        return {
          Exercise: this.selectedExercise,
          Date: new Date(timestamp).toLocaleDateString(), // Convert timestamp to date
          Weight: item.weight,
          Reps: item.reps,
          Intensity: item.intensity
        };
      });
    });
  }
}
