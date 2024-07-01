const rule = require("../lib/rules/no-async-iteration");
const RuleTesterV8 = require("eslint-v8").RuleTester;
const RuleTesterV9 = require("eslint-v9").RuleTester;

const ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2018 } });

ruleTesterV8.run("no-async-iteration", rule, {
  valid: [{ code: "async function foo() { for(const a of b) {} }" }],
  invalid: [
    {
      code: "async function foo() { for await(const a of b) {} }",
      errors: [
        {
          message: "Async Iteration is not supported in undefined",
        },
      ],
    },
  ],
});
