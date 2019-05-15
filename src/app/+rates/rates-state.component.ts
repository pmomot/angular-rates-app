import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RatesFeatureService } from './services/rates-feature.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./rates-state.component.scss'],
  template: `
    <div class="rs-content">
      <ng-container *ngIf="symbolsLoading$ | async; else mainContent">
        <app-skeleton-form class="rs-form card"></app-skeleton-form>
        <app-skeleton-chart class="rs-chart card"></app-skeleton-chart>
      </ng-container>
    </div>
    <ng-template #mainContent>
      <app-conversion-form
        class="rs-form card"
        [base]="base$ | async"
        [quote]="quote$ | async"
        [quoteAmount]="quoteAmount$ | async"
        [baseSymbols]="baseSymbols$ | async"
        [quoteSymbols]="quoteSymbols$ | async"
        (baseChange)="base$.next($event)"
        (quoteChange)="quote$.next($event)"
        (baseAmountChange)="baseAmount$.next($event)"
      >
        <div class="rs-error" *ngIf="apiError$ | async as error">
          {{ error }}
        </div>
      </app-conversion-form>
      <ng-container>
        <div class="rs-chart card" *ngIf="chartData$ | async as chartData">
          <app-value-change period="last 30 days" [pair]="chartData.pair" [value]="chartData.valueChange"></app-value-change>
          <app-line-chart [chartData]="chartData"></app-line-chart>
        </div>
      </ng-container>
    </ng-template>
  `
})
export class RatesStateComponent implements OnDestroy, OnInit {
  private readonly componentDestroy$ = new Subject();
  readonly apiError$ = this.ratesFeatureService.apiError$;
  readonly symbolsLoading$ = this.ratesFeatureService.symbolsLoading$;
  readonly baseSymbols$ = this.ratesFeatureService.baseSymbols$;
  readonly quoteSymbols$ = this.ratesFeatureService.quoteSymbols$;
  readonly base$ = this.ratesFeatureService.base$;
  readonly quote$ = this.ratesFeatureService.quote$;
  readonly baseAmount$ = this.ratesFeatureService.baseAmount$;
  readonly quoteAmount$ = this.ratesFeatureService.quoteAmount$;
  readonly chartData$ = this.ratesFeatureService.chartData$;

  constructor (private ratesFeatureService: RatesFeatureService) {}

  ngOnInit () {
    this.base$
      .pipe(takeUntil(this.componentDestroy$))
      .subscribe(() => this.quote$.next(null));
  }

  ngOnDestroy () {
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }
}
