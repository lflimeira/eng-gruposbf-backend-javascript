import { graphql } from "@lflimeira/apollo";

import { LIST_CURRENCIES_EXCHANGE } from "./list-currencies-exchange";

const { GraphQLObjectType } = graphql;

export const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    listCurrenciesExchange: LIST_CURRENCIES_EXCHANGE,
  },
});
