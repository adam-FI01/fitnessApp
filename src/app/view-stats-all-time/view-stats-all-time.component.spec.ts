import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatsAllTimeComponent } from './view-stats-all-time.component';

describe('ViewStatsAllTimeComponent', () => {
  let component: ViewStatsAllTimeComponent;
  let fixture: ComponentFixture<ViewStatsAllTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStatsAllTimeComponent]
    });
    fixture = TestBed.createComponent(ViewStatsAllTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
