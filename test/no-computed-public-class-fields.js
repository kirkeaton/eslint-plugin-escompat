var rule = require("../lib/rules/no-computed-public-class-fields");
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
    { code: 'class Foo { ["bar"]() {} }' },
    { code: 'class Foo { static ["bar"]() {} }' },
    { code: "class Foo { static bar = () => {} }" },
    { code: "class Foo { static bar = 1 }" },
    { code: "class Foo { bar = () => {} }" },
    { code: "class Foo { bar = 1 }" },
  ],
  invalid: [
    {
      code: 'class Foo { ["bar"] = () => {} }',
      errors: [
        {
          message: "Computed Class Fields are not supported in undefined",
        },
      ],
    },
    {
      code: 'class Foo { ["bar"] = 1 }',
      errors: [
        {
          message: "Computed Class Fields are not supported in undefined",
        },
      ],
    },
    {
      code: 'class Foo { static ["bar"] = () => {} }',
      errors: [
        {
          message: "Computed Class Fields are not supported in undefined",
        },
      ],
    },
    {
      code: 'class Foo { static ["bar"] = 1 }',
      errors: [
        {
          message: "Computed Class Fields are not supported in undefined",
        },
      ],
    },
  ],
};

ruleTesterV8.run("no-computed-public-class-fields", rule, tests);
ruleTesterBabel.run("no-computed-public-class-fields (babel)", rule, tests);
