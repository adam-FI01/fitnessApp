import { TestBed } from '@angular/core/testing';

import { ViewStatsMonthlyService } from './view-stats-monthly.service';

describe('ViewStatsMonthlyService', () => {
  let service: ViewStatsMonthlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewStatsMonthlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
