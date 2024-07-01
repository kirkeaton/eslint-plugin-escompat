var rule = require("../lib/rules/no-exponentiation-operator");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2018 } });

ruleTesterV8.run("no-exponentiation-operator", rule, {
  valid: [
    { code: "Math.pow(2, 2)" },
    { code: "2 * 2 * 2" },
    { code: "a = Math.pow(a * 2)" },
    { code: "a = a * 2 * 2" },
  ],
  invalid: [
    {
      code: "2 ** 2",
      errors: [
        {
          message: "Exponentiation Operator is not supported in undefined",
        },
      ],
    },
    {
      code: "a **= 2",
      errors: [
        {
          message: "Exponentiation Operator is not supported in undefined",
        },
      ],
    },
  ],
});
