import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatsMonthlyComponent } from './view-stats-monthly.component';

describe('ViewStatsMonthlyComponent', () => {
  let component: ViewStatsMonthlyComponent;
  let fixture: ComponentFixture<ViewStatsMonthlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStatsMonthlyComponent]
    });
    fixture = TestBed.createComponent(ViewStatsMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
