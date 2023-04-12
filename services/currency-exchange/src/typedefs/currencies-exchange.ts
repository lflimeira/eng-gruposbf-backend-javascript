import { graphql } from "@lflimeira/apollo";

const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } =
  graphql;

export const CurrencyExchange = new GraphQLObjectType({
  name: "CurrencyExchange",
  fields: () => ({
    currencyCode: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});
