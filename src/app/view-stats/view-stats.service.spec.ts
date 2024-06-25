import { TestBed } from '@angular/core/testing';

import { ViewStatsService } from './view-stats.service';

describe('ViewStatsService', () => {
  let service: ViewStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
