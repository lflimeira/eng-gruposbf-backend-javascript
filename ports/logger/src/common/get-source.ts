export const getSource = (stack: string): string => {
  const lines = stack.split("\n");
  const line = lines[3];
  const match = line.match(/\((.*):(\d+):(\d+)\)/);
  if (match) {
    return `${match[1].replace(process.cwd(), "")}:${match[2]}`;
  }
  return "unknown";
};
