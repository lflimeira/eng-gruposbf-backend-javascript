module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testRegex: ".test.ts$",
  testPathIgnorePatterns: ["node_modules", "build"],
  watchman: true,
};
