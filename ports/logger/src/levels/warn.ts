import { Logger, PrefixedFunction } from "../common/types";

export default (log: PrefixedFunction): Logger["warn"] => {
  return (params) => log("warn")(params);
};
