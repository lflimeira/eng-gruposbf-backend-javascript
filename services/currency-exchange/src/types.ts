import { CurrencyExchangeDomain } from "@lflimeira/domains";

export interface Context {
  Domains: {
    CurrencyExchange: Awaited<ReturnType<typeof CurrencyExchangeDomain>>;
  };
}
