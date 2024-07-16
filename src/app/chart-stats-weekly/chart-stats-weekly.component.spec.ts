import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStatsWeeklyComponent } from './chart-stats-weekly.component';

describe('ChartStatsWeeklyComponent', () => {
  let component: ChartStatsWeeklyComponent;
  let fixture: ComponentFixture<ChartStatsWeeklyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartStatsWeeklyComponent]
    });
    fixture = TestBed.createComponent(ChartStatsWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
