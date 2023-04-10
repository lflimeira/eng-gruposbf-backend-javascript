import { MongoDBConnector } from "@lflimeira/mongodb";
import { Logger } from "@lflimeira/logger";
import { z } from "zod";

import { Currency } from "../types/currency";
import { validateInput } from "../../utils";
import { COLLECTION } from "../constants";

import {
  GetCurrencyFailedError,
  InsertCurrencyFailedError,
} from "../types/errors";

const schema = z.object({
  currencyCode: z.string().length(3),
  country: z.string(),
});

const addCurrency = (MongoDB: MongoDBConnector, Logger: Logger) => {
  return async ({ ...input }: z.infer<typeof schema>): Promise<Currency> => {
    await validateInput({
      schema,
      input: {
        ...input,
      },
    });

    try {
      const currency = await MongoDB.findOne({
        collection: COLLECTION,
        query: { currencyCode: input.currencyCode },
      });

      if (currency) {
        Logger.info({
          message: "Currency already registered",
          details: { currency: input },
        });
        return currency;
      }
    } catch (err) {
      Logger.error({
        error: err as Error,
        message: "Get currency from database failed",
        details: {
          currency: input,
        },
      });

      throw new GetCurrencyFailedError();
    }

    try {
      const newCurrency = await MongoDB.insert<Currency>({
        collection: COLLECTION,
        item: input,
      });

      Logger.info({
        message: "Currency inserted successfully",
        details: { currency: newCurrency },
      });

      return newCurrency;
    } catch (err) {
      Logger.error({
        error: err as Error,
        message: "Insert currency on database failed",
        details: {
          currency: input,
        },
      });

      throw new InsertCurrencyFailedError();
    }
  };
};

export default addCurrency;
