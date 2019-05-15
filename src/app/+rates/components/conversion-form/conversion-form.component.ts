import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { trackByIndex } from '../../../shared/utils/track-by-index';

@Component({
  selector: 'app-conversion-form',
  template: `
    <div class="form-group">
      <div class="form-group__label">Base</div>
      <div class="select-wrapper">
        <select name="base-currency" (change)="baseChange.emit($event.target.value)">
          <option *ngIf="!base">Select base currency</option>
          <option *ngFor="let s of baseSymbols; trackBy: trackByIndex" [value]="s">{{ s }}</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <div class="form-group__label">Quote</div>
      <div class="select-wrapper">
        <select name="base-currency" (change)="quoteChange.emit($event.target.value)">
          <option *ngIf="!quote">Select quote currency</option>
          <option *ngFor="let s of quoteSymbols; trackBy: trackByIndex" [value]="s">{{ s }}</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <div class="form-group__label">
        Base amount
        <span *ngIf="base">({{ base }})</span>
      </div>
      <input
        class="input"
        type="number"
        [readonly]="!(base && quote)"
        [disabled]="loading"
        (input)="baseAmountChange.emit(+$event.target.value)"
      >
    </div>
    <div class="form-group">
      <div class="form-group__label">
        Quote amount
        <span *ngIf="quote">({{ quote }})</span>
      </div>
      <input class="input" type="number" [value]="quoteAmount" readonly>
    </div>
    <ng-content></ng-content>
  `,
  styleUrls: ['./conversion-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversionFormComponent {
  @Input() base: string;
  @Input() quote: string;
  @Input() baseSymbols: string[];
  @Input() quoteSymbols: string[];
  @Input() quoteAmount: number;
  @Input() loading: boolean;
  @Output() baseChange = new EventEmitter<string>();
  @Output() quoteChange = new EventEmitter<string>();
  @Output() baseAmountChange = new EventEmitter<number>();
  readonly trackByIndex = trackByIndex;
  // baseAmount: number;

}
