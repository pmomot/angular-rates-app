import { createSelector } from '@ngrx/store';

import { RootState } from '../';

import { RatesActions, RatesActionsUnion } from './rates.actions';

export interface RatesState {
  loading: boolean;
  symbols: string[];
}

export const initialState: RatesState = {
  symbols: [],
  loading: false
};

export function ratesReducer (state = initialState, action: RatesActionsUnion) {
  switch (action.type) {

    case RatesActions.GetAllSymbols: {
      return {
        ...state,
        loading: true
      };
    }

    case RatesActions.GetAllSymbolsDone: {
      return {
        ...state,
        symbols: action.payload,
        loading: false
      };
    }

    case RatesActions.GetAllSymbolsFailed: {
      return {
        ...state,
        loading: false
      };
    }

    default:
      return state;
  }
}

export const selectRatesState = (state: RootState) => state.rates;
export const selectSymbolsLoading = createSelector(selectRatesState, ({loading}) => loading);
export const selectSymbols = createSelector(selectRatesState, ({symbols}) => symbols);
