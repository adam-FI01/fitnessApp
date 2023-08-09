import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturningCustomerloginComponent } from './returning-customerlogin.component';

describe('ReturningCustomerloginComponent', () => {
  let component: ReturningCustomerloginComponent;
  let fixture: ComponentFixture<ReturningCustomerloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturningCustomerloginComponent]
    });
    fixture = TestBed.createComponent(ReturningCustomerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
