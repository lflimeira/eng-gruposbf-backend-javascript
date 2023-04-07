import { Logger } from "@lflimeira/logger";
import { ApolloServer as LocalApolloServer, Config } from "apollo-server";
import { ApolloServer as LambdaApolloServer } from "apollo-server-lambda";

export type GraphQLOptions = Pick<
  Config<LocalApolloServer | LambdaApolloServer>,
  "schema" | "plugins" | "resolvers" | "context" | "typeDefs"
> & { port: number; logger: Logger };

export type ConfigOptions = {
  env: "development" | "production";
};

export type GraphQLLambda = (
  params: GraphQLOptions & ConfigOptions
) => LocalApolloServer | LambdaApolloServer;
