import { Action } from '@ngrx/store';

export enum RatesActions {
  GetAllSymbols        = '[Get] All Symbols',
  GetAllSymbolsDone    = '[Get] All Symbols Done',
  GetAllSymbolsFailed  = '[Get] All Symbols Failed'
}

export class GetAllSymbols implements Action {
  readonly type = RatesActions.GetAllSymbols;
  constructor () {}
}

export class GetAllSymbolsDone implements Action {
  readonly type = RatesActions.GetAllSymbolsDone;
  constructor (public payload: string[]) {}
}

export class GetAllSymbolsFailed implements Action {
  readonly type = RatesActions.GetAllSymbolsFailed;
  constructor (public payload: Error) {}
}

export type RatesActionsUnion = GetAllSymbols
  | GetAllSymbolsDone
  | GetAllSymbolsFailed;
