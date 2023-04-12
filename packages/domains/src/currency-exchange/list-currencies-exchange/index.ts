import { MongoDBConnector } from "@lflimeira/mongodb";
import { Logger } from "@lflimeira/logger";
import { z } from "zod";

import { Currency, CurrencyExchange } from "../types/currency";
import { COLLECTION } from "../constants";
import { ListCurrenciesFailedError } from "../types/errors";
import { validateInput } from "../../utils";
import { QuotationConnector } from "../ports/quotation-api";

const schema = z.object({
  amount: z.number().positive(),
});

const listCurrenciesExchange = (
  MongoDB: MongoDBConnector,
  Logger: Logger,
  Quotation: QuotationConnector
) => {
  return async ({
    ...input
  }: z.infer<typeof schema>): Promise<CurrencyExchange[]> => {
    await validateInput({
      schema,
      input: {
        ...input,
      },
    });

    try {
      const currencies = await MongoDB.findAll<Currency>({
        collection: COLLECTION,
      });

      const currenciesExchange = await currencies.map(async (currency) => {
        const quotationAmount = await Quotation.getQuotation(
          currency.currencyCode
        );
        return {
          currencyCode: currency.currencyCode,
          country: currency.country,
          amount: parseFloat((input.amount / quotationAmount).toFixed(2)),
        };
      });

      return await Promise.all(currenciesExchange);
    } catch (err) {
      Logger.error({
        error: err as Error,
        message: "List currencies from database failed",
      });

      throw new ListCurrenciesFailedError();
    }
  };
};

export default listCurrenciesExchange;
