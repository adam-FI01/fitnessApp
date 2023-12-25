import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-view-stats',
  templateUrl: './view-stats.component.html',
  styleUrls: ['./view-stats.component.scss']
})
export class ViewStatsComponent {
  customers: any;
  showChartDaily: boolean = false;
  showChartWeekly: boolean = false;
  showChartMonthly: boolean = false;
  showChartAllTime: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setChartVisibility();
      }
    });

    // Initialize the visibility based on the initial route
    this.setChartVisibility();
    console.log(this.route)

    this.customers = [
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
      {
        Date: '12/17/2022',
        Weight: '140',
        Reps: '12',
      },
    ]; 
  }

  private setChartVisibility() {
    const fullUrl = this.router.url;
    console.log(fullUrl);
  
    // Reset all visibility properties to false
    this.showChartDaily = false;
    this.showChartWeekly = false;
    this.showChartMonthly = false;
    this.showChartAllTime = false;
  
    // Set visibility based on the current route
    switch (fullUrl) {
      case '/home/view-stats/view-stats-weekly':
        this.showChartWeekly = true;
        break;
      case '/home/view-stats/view-stats-monthly':
        this.showChartMonthly = true;
        break;
      case '/home/view-stats/view-stats-allTime':
        this.showChartAllTime = true;
        break;
      default:
        this.showChartDaily = true;
    }
  }
}



