import crypto from "crypto";

import { Logger } from "@lflimeira/logger";
import { PluginDefinition } from "apollo-server-core";

export default ({ logger }: { logger: Logger }): PluginDefinition => ({
  async requestDidStart({ request, context }) {
    const startedAt = new Date().toISOString();
    const requestId = crypto.randomUUID();

    logger.info({
      details: {
        request,
        startedAt,
        context,
        requestId,
      },
      message: "Request started",
    });

    return {
      async willSendResponse({ response }) {
        const finishedAt = new Date().toISOString();

        logger.info({
          details: {
            request,
            response,
            context,
            finishedAt,
            startedAt,
            requestId,
          },
          message: "Request finished",
        });
      },
    };
  },
});
