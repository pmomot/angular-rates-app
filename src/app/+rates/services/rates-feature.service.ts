import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { RootState } from '../../state';
import { selectSymbols, selectSymbolsLoading } from '../../state/rates/rates.reducer';
import { RatesTimeSeriesService } from './rates-time-series.service';
import { CurrencyConverterService, Pair } from './currency-converter.service';

@Injectable({
  providedIn: 'root'
})
export class RatesFeatureService {
  readonly apiError$ = new Subject<string>();
  readonly symbolsLoading$ = this.store.pipe(
    select(selectSymbolsLoading),
    shareReplay(1)
  );
  readonly baseSymbols$ = this.store.pipe(
    select(selectSymbols),
    shareReplay(1)
  );
  readonly base$ = new Subject<string>();
  readonly quote$ = new Subject<string>();
  readonly pair$: Observable<Pair> = combineLatest(this.base$, this.quote$).pipe(

    map(([base, quote]) => ({base, quote})),
    shareReplay(1)
  );
  readonly quoteInfo$ = this.base$.pipe(
    switchMap(base => this.currencyConverterService.getRatesForBase(base)),
    map(({rates, error}) => {
      this.apiError$.next(error);
      return rates;
    }),
    shareReplay(1)
  );
  readonly quoteSymbols$ = this.quoteInfo$.pipe(
    map(quoteInfo => Object.keys(quoteInfo)),
    shareReplay(1)
  );
  readonly chartData$ = this.pair$.pipe(
    filter(({base, quote}) => !!(base && quote)),
    switchMap(({base, quote}) => this.ratesTimeSeriesService.getRatesTimeSeries(base, quote)),
    shareReplay(1)
  );
  readonly baseAmount$ = new Subject<number>();
  readonly quoteAmount$ = combineLatest(this.baseAmount$, this.pair$).pipe(
    withLatestFrom(this.quoteInfo$),
    filter(([[baseAmount]]) => baseAmount > 0),
    map(([[baseAmount, pair], rates]) => {
      if (!(pair.base && pair.quote)) {
        return 0;
      }
      return this.currencyConverterService.convert(pair, baseAmount, rates);
    }),
    shareReplay(1)
  );

  constructor (
    private store: Store<RootState>,
    private ratesTimeSeriesService: RatesTimeSeriesService,
    private currencyConverterService: CurrencyConverterService
  ) {}
}
