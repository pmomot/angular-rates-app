import { Injectable } from '@angular/core';
import { RatesDataService } from '../../api/rates/rates-data.service';
import { map } from 'rxjs/operators';

export interface Pair {
  base: string;
  quote: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  constructor (private ratesDataService: RatesDataService) {}

  convert (pair: Pair, baseAmount: number, rates: {[key: string]: number}) {
    return +(rates[pair.quote] * baseAmount).toFixed(2);
  }

  getRatesForBase (base: string) {
    return this.ratesDataService.getLatestRates(base).pipe(
      map(rates => {
        if (Object.keys(rates).length === 0) {
          return {rates, error: 'Base currency info is restricted'};
        }
        return {rates, error: null};
      })
    );
  }
}
