export interface SymbolsResponse {
  success: boolean;
  symbols: {
    [key: string]: string;
  };
}

export interface RatesResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [currency: string]: number
  };
  error?: {
    code: number;
    type: string;
  };
}
