import { Logger, PrefixedFunction } from "../common/types";

export default (log: PrefixedFunction): Logger["debug"] => {
  return (params) => log("debug")(params);
};
