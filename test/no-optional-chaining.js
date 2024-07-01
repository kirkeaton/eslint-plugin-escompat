var rule = require("../lib/rules/no-optional-chaining");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterBabel = new RuleTesterV8({
  parser: require.resolve("@babel/eslint-parser"),
});
var ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2020 } });

const tests = {
  valid: [{ code: "(foo||{}).bar" }],
  invalid: [
    {
      code: "foo?.bar",
      errors: [
        {
          message: "Optional Chaining is not supported in undefined",
        },
      ],
    },
  ],
};

ruleTesterV8.run("no-optional-chaining", rule, tests);
ruleTesterBabel.run("no-optional-chaining (babel)", rule, tests);
