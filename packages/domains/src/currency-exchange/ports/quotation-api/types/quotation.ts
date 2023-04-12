export interface QuotationResponse {
  [key: string]: { high: string };
}

export interface QuotationConnector {
  getQuotation: (currencyCode: string) => Promise<number>;
}
