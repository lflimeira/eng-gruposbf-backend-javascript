import { graphql } from "@lflimeira/apollo";

const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } =
  graphql;

export const CurrencyExchange = new GraphQLObjectType({
  name: "CurrencyExchange",
  fields: () => ({
    currencyCode: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});
