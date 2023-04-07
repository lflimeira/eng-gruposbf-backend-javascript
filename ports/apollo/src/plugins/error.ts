import { Logger } from "@lflimeira/logger";
import {
  PluginDefinition,
  AuthenticationError,
  UserInputError,
  ForbiddenError,
  ApolloError,
} from "apollo-server-core";

type ErrorMapper = {
  message: string;
  code?: string;
};

const mapper = {
  UNAUTHENTICATED: {
    error: ({ message }: ErrorMapper) => new AuthenticationError(message),
    status: 401,
  },
  FORBIDDEN: {
    error: ({ message }: ErrorMapper) => new ForbiddenError(message),
    status: 403,
  },
  BAD_USER_INPUT: {
    error: ({ message }: ErrorMapper) => new UserInputError(message),
    status: 400,
  },
  BAD_REQUEST: {
    error: ({ message, code }: ErrorMapper) => new ApolloError(message, code),
    status: 400,
  },
};

const main = {
  error: ({ message, code }: ErrorMapper) => new ApolloError(message, code),
  status: 500,
};

export default ({ logger }: { logger: Logger }): PluginDefinition => ({
  async requestDidStart({ request, context }) {
    return {
      async didEncounterErrors({ errors, response }) {
        const finishedAt = new Date().toISOString();

        const error = errors[0];

        logger.error({
          error,
          details: {
            request,
            response,
            context,
            finishedAt,
          },
          message: "Request encountered errors",
        });

        const [message, code] = error.message.split(":--:");

        const {
          error: buildError,
          status,
          // @ts-expect-error We know what we are doing
        } = code in mapper ? mapper[code] : main;

        // @ts-expect-error We want to change the error instance
        errors[0] = buildError({ message, code });

        // @ts-expect-error We want to set status code
        response.http.status = status;

        return;
      },
    };
  },
});
