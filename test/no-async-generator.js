const rule = require("../lib/rules/no-async-generator");
const RuleTesterV8 = require("eslint-v8").RuleTester;
const RuleTesterV9 = require("eslint-v9").RuleTester;

const ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2018 } });
const ruleTesterV9 = new RuleTesterV9({
  languageOptions: { ecmaVersion: 2018 },
});

const test = {
  valid: [
    { code: "function*generator(){yield 42;}" },
    { code: "async function generator(){await 42;}" },
  ],
  invalid: [
    {
      code: "async function*generator(){yield 42;}",
      errors: [
        {
          message: "Async Generators are not supported in undefined",
        },
      ],
    },
  ],
};

ruleTesterV8.run("no-async-generator", rule, test);
ruleTesterV9.run("no-async-generator", rule, test);
