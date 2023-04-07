import { Logger } from "@lflimeira/logger";
import { ApolloServer as LocalApolloServer } from "apollo-server";
import { ApolloServer as LambdaApolloServer } from "apollo-server-lambda";

import apolloLogger from "./plugins/logger";
import apolloError from "./plugins/error";
import { ConfigOptions, GraphQLOptions } from "./types";

const buildCommonOptions = ({ logger }: { logger: Logger }) => {
  return {
    cache: "bounded" as any,
    logger: {
      debug: (message: string) => logger.debug({ message }),
      error: (message: string) => logger.warn({ message }),
      info: (message: string) => logger.info({ message }),
      warn: (message: string) => logger.warn({ message }),
    },
  };
};

const local = ({ port, logger, ...options }: GraphQLOptions) => {
  const server = new LocalApolloServer({
    ...options,
    ...buildCommonOptions({ logger }),
  });

  server
    .listen(port)
    .then(({ url }) =>
      logger.info({
        message: `🚀 Server ready at ${url}`,
      })
    )
    .catch((err) => logger.info({ message: `err.message ${err.message}` }));

  return server;
};

const cloud = ({ port: _, logger, ...options }: GraphQLOptions) => {
  const server = new LambdaApolloServer({
    ...options,
    ...buildCommonOptions({ logger }),
  });

  return server.createHandler();
};

export default ({
  env,
  port,
  logger,
  ...options
}: GraphQLOptions & ConfigOptions) => {
  const config: GraphQLOptions = {
    plugins: [
      ...(options.plugins ?? [
        apolloLogger({ logger }),
        apolloError({ logger }),
      ]),
    ],
    schema: options.schema,
    typeDefs: options.typeDefs,
    resolvers: options.resolvers,
    context: options.context,
    port,
    logger,
  };

  return {
    development: local,
    production: cloud,
  }[env](config);
};
