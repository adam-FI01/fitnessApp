import { TestBed } from '@angular/core/testing';

import { RemoveExerciseService } from './remove-exercise.service';

describe('RemoveExerciseService', () => {
  let service: RemoveExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
