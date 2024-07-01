var rule = require("../lib/rules/no-numeric-separators");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterBabel = new RuleTesterV8({
  parser: require.resolve("@babel/eslint-parser"),
});
var ruleTesterV8 = new RuleTesterV8({
  parserOptions: { sourceType: "module", ecmaVersion: 2021 },
});

const tests = {
  valid: [
    { code: "100000000" },
    { code: "1.00000000" },
    { code: "1e8" },
    { code: '"1_000_000"' },
    { code: "0" },
  ],
  invalid: [
    {
      code: "100_000_000",
      output: "100000000",
      errors: [
        {
          message: "Numeric Separators are not supported in undefined",
        },
      ],
    },
    {
      code: "1_000_000",
      output: "1000000",
      errors: [
        {
          message: "Numeric Separators are not supported in undefined",
        },
      ],
    },
    {
      code: "100_0",
      output: "1000",
      errors: [
        {
          message: "Numeric Separators are not supported in undefined",
        },
      ],
    },
    {
      code: "100_000_000",
      output: "100000000",
      errors: [
        {
          message: "Numeric Separators are not supported in undefined",
        },
      ],
    },
  ],
};

ruleTesterV8.run("no-numeric-separators (babel)", rule, tests);
ruleTesterBabel.run("no-numeric-separators (babel)", rule, tests);
