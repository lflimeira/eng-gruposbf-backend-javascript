import { graphql } from "@lflimeira/apollo";

import { CurrencyExchange as TCurrencyExchange } from "../typedefs/currencies-exchange";

import { Context } from "../types";

const { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt, GraphQLList } =
  graphql;

const Response = new GraphQLList(TCurrencyExchange);

const Input = new GraphQLInputObjectType({
  name: "ListCurrenciesExchangeInput",
  fields: {
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const LIST_CURRENCIES_EXCHANGE = {
  type: new GraphQLNonNull(Response),
  args: {
    input: { type: new GraphQLNonNull(Input) },
  },
  resolve: async (_: any, { input }: any, { Domains }: Context) => {
    return await Domains.CurrencyExchange.listCurrenciesExchange(input);
  },
};
