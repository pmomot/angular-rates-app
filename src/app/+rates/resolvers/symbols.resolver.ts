import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../../state';
import { GetAllSymbols } from '../../state/rates/rates.actions';

@Injectable()
export class SymbolsResolver implements Resolve<any> {

  constructor (private store: Store<RootState>) {}

  resolve () {
    this.store.dispatch(new GetAllSymbols());
    return of(true);
  }
}
