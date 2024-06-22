import { TestBed } from '@angular/core/testing';

import { ViewStatsWeeklyService } from './view-stats-weekly.service';

describe('ViewStatsWeeklyService', () => {
  let service: ViewStatsWeeklyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewStatsWeeklyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
