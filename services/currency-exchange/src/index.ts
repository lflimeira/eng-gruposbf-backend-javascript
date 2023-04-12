import { apollo, graphql } from "@lflimeira/apollo";
import createLogger from "@lflimeira/logger";
import { CurrencyExchangeDomain } from "@lflimeira/domains";

import { RootQuery } from "./queries";
import { RootMutation } from "./mutations";
import { Context } from "./types";
import { DATABASE } from "./constants";

const { GraphQLSchema } = graphql;

const Logger = createLogger({
  prefix: "Currency Exchange Service",
});

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

const context: Context = {
  Domains: {
    CurrencyExchange: await CurrencyExchangeDomain({
      Logger,
      config: {
        host: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`,
        database: DATABASE,
      },
    }),
  },
};

export const handler = apollo({
  env: process.env.NODE_ENV === "production" ? "production" : "development",
  port: 5003,
  logger: Logger,
  context: () => {
    return context;
  },
  schema: new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
  }),
});
