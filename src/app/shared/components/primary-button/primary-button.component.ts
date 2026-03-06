import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent {
  @Output() onClick = new EventEmitter<Event>();

  onClickButton(event: Event) {
    this.onClick.emit(event);
  }
}
