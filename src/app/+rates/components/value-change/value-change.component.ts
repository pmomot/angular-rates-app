import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-value-change',
  template: `
    <b>{{ pair }}</b> change, {{ period }}: <b [ngClass]="colorClass">{{ value }}%</b>
  `,
  styleUrls: ['./value-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueChangeComponent {
  @Input() pair: string;
  @Input() value: number;
  @Input() period: string;

  get colorClass () {
    if (this.value > 0) {
      return 'vc--rise';
    } else if (this.value < 0) {
      return 'vc--fall';
    }
    return '';
  }
}
