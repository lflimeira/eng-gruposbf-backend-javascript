export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogParams = {
  message: string;
  userId?: string;
  stacktrace?: string;
  details?: Record<string, any>;
};

export type LogOptions = {
  prefix?: string;
  sensitiveKeys?: string[];
};

export type PrefixedFunction = (level: LogLevel) => LogFunction<unknown>;

export type LogFunction<Extension = void> = (
  params: Omit<LogParams & Extension, "void">
) => void;

export interface Logger {
  info: LogFunction;
  debug: LogFunction;
  warn: LogFunction;
  error: LogFunction<{ error: Error }>;
}
