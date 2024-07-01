var rule = require("../lib/rules/no-bigint");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2020 } });
var ruleTesterV9 = new RuleTesterV9({ languageOptions: { ecmaVersion: 2020 } });

var test = {
  valid: [{ code: "0" }, { code: "1000000" }],
  invalid: [
    {
      code: "0n",
      errors: [
        {
          message: "BigInts are not supported in undefined",
        },
      ],
    },
  ],
};

ruleTesterV8.run("no-bigint", rule, test);
ruleTesterV9.run("no-bigint", rule, test);
