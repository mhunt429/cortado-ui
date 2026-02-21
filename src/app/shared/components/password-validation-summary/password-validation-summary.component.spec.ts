import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordValidationSummaryComponent } from './password-validation-summary.component';

describe('PasswordValidationSummaryComponent', () => {
  let component: PasswordValidationSummaryComponent;
  let fixture: ComponentFixture<PasswordValidationSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordValidationSummaryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordValidationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
