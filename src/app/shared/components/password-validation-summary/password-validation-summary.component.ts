import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-validation-summary',
  templateUrl: './password-validation-summary.component.html',
  styleUrls: ['./password-validation-summary.component.scss'],
})
export class PasswordValidationSummaryComponent {
  @Input() greaterThanOrEqualToMinLength = false;
  @Input() containsNumber = false;
  @Input() containsSymbol = false;
  @Input() containsUpperCase = false;
  @Input() containsLowerCase = false;
}
