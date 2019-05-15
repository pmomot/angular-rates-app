import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { RatesActions, GetAllSymbolsDone, GetAllSymbolsFailed } from './rates.actions';
import { RatesDataService } from '../../api/rates/rates-data.service';

@Injectable()
export class RatesEffects {

  @Effect()
  symbols$ = this.actions$.pipe(
    ofType(RatesActions.GetAllSymbols),
    switchMap(() =>
      timer(5000).pipe(
        switchMap(() =>
          this.ratesDataService.getAllSymbols().pipe(
            map(data => new GetAllSymbolsDone(data)),
            catchError(error => of(new GetAllSymbolsFailed(error)))
          )
        )
      )
    )
  );

  constructor (
    private actions$: Actions,
    private ratesDataService: RatesDataService
  ) {}
}
