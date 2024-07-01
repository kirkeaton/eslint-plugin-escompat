var rule = require("../lib/rules/no-do-expression");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterV8 = new RuleTesterV8({
  parser: require.resolve("@babel/eslint-parser"),
  parserOptions: { ecmaVersion: 2018 },
});

ruleTesterV8.run("no-do-expression", rule, {
  valid: [{ code: "() => { return 1 > 0 }" }],
  invalid: [
    {
      code: "() => { return do { return 1 > 0 } === true }",
      errors: [
        {
          message: "Do Expressions are not supported in undefined",
        },
      ],
    },
  ],
});
