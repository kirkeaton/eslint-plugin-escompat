var rule = require("../lib/rules/no-nullish-coalescing");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2020 } });

ruleTesterV8.run("no-nullish-coalescing", rule, {
  valid: [{ code: "foo !== undefined && foo !== null ? foo : 1" }],
  invalid: [
    {
      code: "foo ?? 1",
      errors: [
        {
          message:
            "the Nullish Coalescing Operator is not supported in undefined",
        },
      ],
    },
  ],
});
