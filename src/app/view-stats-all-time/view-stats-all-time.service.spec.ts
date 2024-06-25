import { TestBed } from '@angular/core/testing';

import { ViewStatsAllTimeService } from './view-stats-all-time.service';

describe('ViewStatsAllTimeService', () => {
  let service: ViewStatsAllTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewStatsAllTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
