var rule = require("../lib/rules/no-bind-operator");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterV8 = new RuleTesterV8({
  parser: require.resolve("@babel/eslint-parser"),
  parserOptions: { ecmaVersion: 2018 },
});

ruleTesterV8.run("no-bind-operator", rule, {
  valid: [
    { code: "console.log.bind(console)" },
    { code: "console.log.call(console)" },
  ],
  invalid: [
    {
      code: "console::log",
      errors: [
        {
          message: "The Bind Operator is not supported in undefined",
        },
      ],
    },
    {
      code: "::console.log",
      errors: [
        {
          message: "The Bind Operator is not supported in undefined",
        },
      ],
    },
    {
      code: "console::log(1)",
      errors: [
        {
          message: "The Bind Operator is not supported in undefined",
        },
      ],
    },
    {
      code: "::console.log(1)",
      errors: [
        {
          message: "The Bind Operator is not supported in undefined",
        },
      ],
    },
  ],
});
