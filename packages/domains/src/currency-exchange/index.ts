import { mongodb } from "@lflimeira/mongodb";
import { Logger } from "@lflimeira/logger";
import { z } from "zod";

import { validateInput } from "../utils";

import _addCurrency from "./add-currency";
import _listCurrenciesExchange from "./list-currencies-exchange";

const configSchema = z.object({
  host: z.string(),
  database: z.string(),
});

const domain = async ({
  Logger,
  config,
}: {
  Logger: Logger;
  config: z.input<typeof configSchema>;
}) => {
  const Config = await validateInput({ schema: configSchema, input: config });

  const MongoDB = await mongodb({
    host: Config.host,
    database: Config.database,
  });

  return {
    addCurrency: _addCurrency(MongoDB, Logger),
    listCurrenciesExchange: _listCurrenciesExchange(MongoDB, Logger),
  };
};

export default domain;

export { CurrencyExchange, Currency } from "./types/currency";
