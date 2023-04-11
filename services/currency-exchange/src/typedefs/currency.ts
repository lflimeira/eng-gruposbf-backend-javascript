import { graphql } from "@lflimeira/apollo";

const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = graphql;

export const Currency = new GraphQLObjectType({
  name: "Currency",
  fields: () => ({
    currencyCode: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
