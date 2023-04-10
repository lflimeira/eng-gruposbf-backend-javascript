import { MongoDBConnector } from "@lflimeira/mongodb";
import { Logger } from "@lflimeira/logger";
import { z } from "zod";

import { Currency, CurrencyExchange } from "../types/currency";
import { COLLECTION } from "../constants";
import { ListCurrenciesFailedError } from "../types/errors";
import { validateInput } from "../../utils";

const schema = z.object({
  amount: z.number().positive(),
});

const listCurrenciesExchange = (MongoDB: MongoDBConnector, Logger: Logger) => {
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

      return currencies.map((currency) => ({
        currencyCode: currency.currencyCode,
        country: currency.country,
        // when create the port to get the currency exchange,
        //add the correct amount in this line
        amount: 0,
      }));
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
