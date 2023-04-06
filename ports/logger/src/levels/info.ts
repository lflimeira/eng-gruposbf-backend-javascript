import { Logger, PrefixedFunction } from "../common/types";

export default (log: PrefixedFunction): Logger["info"] => {
  return (params) => log("info")(params);
};
