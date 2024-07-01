var rule = require("../lib/rules/no-private-class-fields");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterBabel = new RuleTesterV8({
  parser: require.resolve("@babel/eslint-parser"),
});
var ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2022 } });

const tests = {
  valid: [
    { code: "class Foo { bar(){} }" },
    { code: "class Foo { static bar() {} }" },
  ],
  invalid: [
    {
      code: "class Foo { #bar = () => {} }",
      errors: [
        {
          message: "Private Class Fields are not supported in undefined",
        },
      ],
    },
    {
      code: "class Foo { #bar = 1 }",
      errors: [
        {
          message: "Private Class Fields are not supported in undefined",
        },
      ],
    },
    {
      code: "class Foo { static #bar = () => {} }",
      errors: [
        {
          message: "Private Class Fields are not supported in undefined",
        },
      ],
    },
    {
      code: "class Foo { static #bar = 1 }",
      errors: [
        {
          message: "Private Class Fields are not supported in undefined",
        },
      ],
    },
  ],
};

ruleTesterV8.run("no-private-class-fields", rule, tests);
ruleTesterBabel.run("no-private-class-fields (babel)", rule, tests);
