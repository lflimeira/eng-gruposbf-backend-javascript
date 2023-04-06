import { Logger, PrefixedFunction } from "../common/types";

const formatStacktrace = (stack: string) =>
  stack
    .split("\n")
    .map((line) => line.replace(process.cwd(), ""))
    .join("\n");

export default (log: PrefixedFunction): Logger["error"] => {
  return (params) =>
    log("error")({
      ...params,
      stacktrace: formatStacktrace(params.error.stack as string),
    });
};
