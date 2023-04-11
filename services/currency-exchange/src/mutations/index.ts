import { graphql } from "@lflimeira/apollo";

import { ADD_CURRENCY } from "./add-currency";

const { GraphQLObjectType } = graphql;

export const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCurrency: ADD_CURRENCY,
  },
});
