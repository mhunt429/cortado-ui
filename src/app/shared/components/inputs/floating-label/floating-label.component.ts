import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-floating-label',
  standalone: true,
  templateUrl: './floating-label.component.html',
  styleUrls: ['./floating-label.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatingLabelComponent),
      multi: true,
    },
  ],
})
export class FloatingLabelComponent {
  @Input() id = '';
  @Input() label = '';
  @Input() name = '';
  @Input() type = 'text';
  @Input() required = false;
  @Input() classes = '';

  value: string | number | Date | null = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string | number | Date | null) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  writeValue(value: string | number | Date | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string | number | Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur() {
    this.onTouched();
  }
}
