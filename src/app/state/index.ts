import { ActionReducerMap } from '@ngrx/store';

import { ratesReducer, RatesState } from './rates';

export interface RootState {
  rates: RatesState;
}

export const reducers: ActionReducerMap<RootState> = {
  rates: ratesReducer
};
