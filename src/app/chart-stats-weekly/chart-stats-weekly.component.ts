import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-chart-stats-weekly',
  templateUrl: './chart-stats-weekly.component.html',
  styleUrls: ['./chart-stats-weekly.component.scss']
})
export class ChartStatsWeeklyComponent implements OnInit, OnChanges {
  @Input() weeklyData: any[] = [];
  @ViewChild('weightChart', { static: true }) weightChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('repsChart', { static: true }) repsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('intensityChart', { static: true }) intensityChartRef!: ElementRef<HTMLCanvasElement>;

  private weightChart!: Chart;
  private repsChart!: Chart;
  private intensityChart!: Chart;

  ngOnInit(): void {
    this.weeklyData = this.generateFakeData();
    this.createCharts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weeklyData']) {
      this.updateCharts();
    }
  }

  createCharts(): void {
    this.weightChart = new Chart(this.weightChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Average Weight',
          data: [],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
      },
      options: {
        responsive: true
      }
    });

    this.repsChart = new Chart(this.repsChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Reps',
          data: [],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        }]
      },
      options: {
        responsive: true
      }
    });

    this.intensityChart = new Chart(this.intensityChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Easy',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }, {
          label: 'Medium',
          data: [],
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }, {
          label: 'Hard',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
    });

    this.updateCharts();
  }

  updateCharts(): void {
    const dates: string[] = [];
    const averageWeights: number[] = [];
    const reps: number[] = [];
    const easyIntensities: number[] = [];
    const mediumIntensities: number[] = [];
    const hardIntensities: number[] = [];

    this.weeklyData.forEach(data => {
      if (!dates.includes(data.Date)) {
        dates.push(data.Date);
      }
    });

    dates.forEach(date => {
      const dailyData = this.weeklyData.filter(data => data.Date === date);
      let totalWeight = 0;
      let totalReps = 0;
      let easy = 0;
      let medium = 0;
      let hard = 0;

      dailyData.forEach(data => {
        totalWeight += data.Weight;
        totalReps += data.Reps;
        if (data.Intensity === 'easy') {
          easy += 1;
        } else if (data.Intensity === 'medium') {
          medium += 1;
        } else if (data.Intensity === 'hard') {
          hard += 1;
        }
      });

      const averageWeight = totalWeight / dailyData.length;
      averageWeights.push(averageWeight);
      reps.push(totalReps);
      easyIntensities.push(easy);
      mediumIntensities.push(medium);
      hardIntensities.push(hard);
    });

    this.weightChart.data.labels = dates;
    this.weightChart.data.datasets[0].data = averageWeights;
    this.weightChart.update();

    this.repsChart.data.labels = dates;
    this.repsChart.data.datasets[0].data = reps;
    this.repsChart.update();

    this.intensityChart.data.labels = dates;
    this.intensityChart.data.datasets[0].data = easyIntensities;
    this.intensityChart.data.datasets[1].data = mediumIntensities;
    this.intensityChart.data.datasets[2].data = hardIntensities;
    this.intensityChart.update();
  }

  generateFakeData(): any[] {
    const fakeData = [
      { Date: '2023-06-01', Weight: 50, Reps: 10, Intensity: 'easy' },
      { Date: '2023-06-01', Weight: 55, Reps: 12, Intensity: 'medium' },
      { Date: '2023-06-01', Weight: 55, Reps: 12, Intensity: 'medium' },
      { Date: '2023-06-01', Weight: 144, Reps: 12, Intensity: 'medium' },
      { Date: '2023-06-01', Weight: 122, Reps: 12, Intensity: 'medium' },
      { Date: '2023-06-01', Weight: 155, Reps: 12, Intensity: 'medium' },
      { Date: '2023-06-01', Weight: 44, Reps: 12, Intensity: 'medium' },
      { Date: '2023-06-01', Weight: 55, Reps: 12, Intensity: 'medium' },
      { Date: '2023-06-01', Weight: 60, Reps: 8, Intensity: 'hard' },
      { Date: '2023-06-02', Weight: 65, Reps: 9, Intensity: 'medium' },
      { Date: '2023-06-02', Weight: 70, Reps: 11, Intensity: 'easy' },
      { Date: '2023-06-03', Weight: 75, Reps: 10, Intensity: 'hard' },
      { Date: '2023-06-03', Weight: 80, Reps: 12, Intensity: 'medium' },
      { Date: '2023-06-04', Weight: 85, Reps: 9, Intensity: 'easy' },
      { Date: '2023-06-04', Weight: 90, Reps: 10, Intensity: 'medium' },
      { Date: '2023-06-04', Weight: 95, Reps: 11, Intensity: 'hard' },
      { Date: '2023-06-05', Weight: 100, Reps: 12, Intensity: 'easy' },
      { Date: '2023-06-06', Weight: 105, Reps: 8, Intensity: 'hard' },
      { Date: '2023-06-06', Weight: 110, Reps: 9, Intensity: 'medium' },
      { Date: '2023-06-07', Weight: 115, Reps: 10, Intensity: 'easy' },
      { Date: '2023-06-07', Weight: 120, Reps: 11, Intensity: 'hard' }
    ];
    return fakeData;
  }
}
