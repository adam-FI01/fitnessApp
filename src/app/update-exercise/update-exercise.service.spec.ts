import { TestBed } from '@angular/core/testing';

import { UpdateExerciseService } from './update-exercise.service';

describe('UpdateExerciseService', () => {
  let service: UpdateExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
