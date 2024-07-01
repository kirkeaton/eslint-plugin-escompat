var rule = require("../lib/rules/no-object-rest-spread");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2019 } });

ruleTesterV8.run("no-object-rest-spread", rule, {
  valid: [
    { code: "const x = { a, b, c }" },
    { code: "const { a, b, c } = x" },
    { code: "const x = [...[1], ...[2]]" },
    { code: "const [x, ...y] = [1,2,3]" },
  ],
  invalid: [
    {
      code: "const x = { ...b }",
      errors: [
        {
          message: "Object Rest/Spread is not supported in undefined",
        },
      ],
    },
    {
      code: "const { ...b } = x",
      errors: [
        {
          message: "Object Rest/Spread is not supported in undefined",
        },
      ],
    },
  ],
});
