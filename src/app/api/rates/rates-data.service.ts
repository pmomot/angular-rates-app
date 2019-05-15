import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { RatesResponse, SymbolsResponse } from './rates.interface';
import { ROUTES } from '../routes';

@Injectable({
  providedIn: 'root'
})
export class RatesDataService {

  constructor (private http: HttpClient) {}

  // here multiple api calls can be combined if we want to add more symbols to app
  getAllSymbols () {
    return this.http.get<SymbolsResponse>(ROUTES.symbols).pipe(
      map(({symbols}) => Object.keys(symbols))
    );
  }

  getLatestRates (base: string, quote?: string) {
    return this.http.get<RatesResponse>(ROUTES.latestRates, {
      params: {
        base,
        ...(quote ? {symbols: quote} : {})
      }
    }).pipe(
      map(({rates}) => {
        if (rates) {
          return rates;
        } else {
          return quote ? {[quote]: null} : {};
        }
      })
    );
  }

  // completely mocked api due to unavailability of it in the free version of fixer.io
  getRatesTimeSeries (_start: Date, _end: Date, _base: string, _quote: string) {
    const today = new Date();
    const rates = Array.from({length: 30}).map(() => {
      return {
        date: new Date(today.setDate(today.getDate() - 1)),
        value: +(1 + Math.ceil(Math.random() * 100) / 100).toFixed(2)
      };
    }).reverse();
    return of(rates);
  }
}
