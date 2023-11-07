import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveExerciseComponent } from './remove-exercise.component';

describe('RemoveExerciseComponent', () => {
  let component: RemoveExerciseComponent;
  let fixture: ComponentFixture<RemoveExerciseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveExerciseComponent]
    });
    fixture = TestBed.createComponent(RemoveExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
