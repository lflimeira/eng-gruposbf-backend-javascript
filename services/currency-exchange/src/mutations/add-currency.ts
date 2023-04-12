import { graphql } from "@lflimeira/apollo";

import { Context } from "../types";

import { Currency as TCurrency } from "../typedefs/currency";

const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = graphql;

const Input = new GraphQLInputObjectType({
  name: "AddCurrencyInput",
  fields: {
    currencyCode: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const ADD_CURRENCY = {
  type: new GraphQLNonNull(TCurrency),
  args: {
    input: { type: new GraphQLNonNull(Input) },
  },
  resolve: async (_: any, { input }: any, { Domains }: Context) => {
    return await Domains.CurrencyExchange.addCurrency(input);
  },
};
