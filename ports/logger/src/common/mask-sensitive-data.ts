const maskSensitiveData = ({
  data,
  sensitiveKeys = [],
}: {
  data: string;
  sensitiveKeys: string[];
}): string => {
  // Matches strings between quotes that come after sensitive keys
  // Also takes into account escaped strings and whitespaces
  return sensitiveKeys
    .map(
      (key) =>
        new RegExp(
          `(${key}(\\"|\\\\+")?:\\s?(\\"|\\\\+"))(.*?)(\\"|\\\\+")`,
          "g"
        )
    )
    .reduce((string, regex) => string.replace(regex, "$1*$5"), data);
};

export default maskSensitiveData;
