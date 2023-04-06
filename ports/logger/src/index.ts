import { error, debug, warn, info } from "./levels";

import { log } from "./common/log";
import { Logger, LogOptions } from "./common/types";

export default (options?: LogOptions): Logger => {
  const prefixedLog = log(options);

  return {
    error: (params) => error(prefixedLog)(params),
    debug: (params) => debug(prefixedLog)(params),
    warn: (params) => warn(prefixedLog)(params),
    info: (params) => info(prefixedLog)(params),
  };
};

export { Logger } from "./common/types";
