import { Component, Input } from '@angular/core';

export enum AlertType {
  Success,
  Info,
  Warning,
  Error,
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() alertType: AlertType = AlertType.Success;
  AlertType = AlertType;

  isVisible = true;

  closeAlert() {
    this.isVisible = false;
  }
}
