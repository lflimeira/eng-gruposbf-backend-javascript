export interface Currency {
  currencyCode: string;
  country: string;
}

export interface CurrencyExchange {
  currencyCode: string;
  country: string;
  amount: number;
}
