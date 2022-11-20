require("util").inspect.defaultOptions.depth = 5; 

module.exports = {
  timeout: "300000",
  files: ["**/*.ava.ts"],
  failWithoutAssertions: false,
  extensions: ["ts"],
  require: ["ts-node/register"],
};
