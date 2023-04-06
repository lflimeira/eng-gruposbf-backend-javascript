import { getSource } from "./get-source";
import maskSensitiveData from "./mask-sensitive-data";
import { LogLevel, LogOptions, LogParams, PrefixedFunction } from "./types";

export const log = (options?: LogOptions): PrefixedFunction => {
  return (level: LogLevel) => {
    // eslint-disable-next-line no-console
    const logFn = console[level];

    return (params: LogParams) => {
      const logData = {
        timestamp: new Date().toISOString(),
        message: `[${options?.prefix ?? "Unknown"}]: ${params.message}`,
        source: getSource(new Error().stack as string),
        stacktrace: params.stacktrace,
        details: params.details,
      };

      const maskedData = maskSensitiveData({
        data:
          process.env.NODE_ENV !== "production"
            ? JSON.stringify(logData, null, 2)
            : JSON.stringify(logData),
        sensitiveKeys: options?.sensitiveKeys ?? [],
      });

      logFn(maskedData);
    };
  };
};
