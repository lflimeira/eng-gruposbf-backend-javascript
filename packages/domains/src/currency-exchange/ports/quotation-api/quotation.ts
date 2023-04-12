import { Logger } from "@lflimeira/logger";
import fetch, { Response } from "node-fetch";

import { QuotationResponse, QuotationConnector } from "./types/quotation";
import { GetQuotationFailedError } from "./types/errors";

const getQuotation = (Logger: Logger) => {
  return async (currencyCode: string): Promise<number> => {
    try {
      const currencyCodeToBRL = `${currencyCode}BRL`;
      const response: Response = await fetch(
        `https://economia.awesomeapi.com.br/last/${currencyCode}-BRL`
      );
      const data: QuotationResponse =
        (await response.json()) as QuotationResponse;

      if (!response.ok || !data) {
        throw new Error("Page Not Found 404");
      }

      const amount = parseFloat(
        parseFloat(data[currencyCodeToBRL].high).toFixed(2)
      );

      Logger.info({
        message: "Quotation got successfully",
        details: {
          quotation: {
            currencyCode,
            amount,
          },
        },
      });

      return amount;
    } catch (err) {
      Logger.error({
        error: err as Error,
        message: "Get quotation failed",
        details: {
          quotation: {
            currencyCode,
          },
        },
      });

      throw new GetQuotationFailedError();
    }
  };
};

export default (Logger: Logger): QuotationConnector => {
  return {
    getQuotation: getQuotation(Logger),
  };
};
