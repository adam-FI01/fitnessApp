import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatsWeeklyComponent } from './view-stats-weekly.component';

describe('ViewStatsWeeklyComponent', () => {
  let component: ViewStatsWeeklyComponent;
  let fixture: ComponentFixture<ViewStatsWeeklyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStatsWeeklyComponent]
    });
    fixture = TestBed.createComponent(ViewStatsWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
