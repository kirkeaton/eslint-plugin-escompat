var rule = require("../lib/rules/no-public-instance-class-fields");
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
    { code: "class Foo { static bar = () => {} }" },
    { code: "class Foo { static bar = 1 }" },
    { code: "class Foo { foo /*: CommentType*/ }" },
  ],
  invalid: [
    {
      code: "class Foo { bar = () => {} }",
      errors: [
        {
          message: "Instance Class Fields are not supported in undefined",
        },
      ],
    },
    {
      code: "class Foo { bar = 1 }",
      errors: [
        {
          message: "Instance Class Fields are not supported in undefined",
        },
      ],
    },
    {
      code: "class Foo { bar = null }",
      errors: [
        {
          message: "Instance Class Fields are not supported in undefined",
        },
      ],
    },
  ],
};

ruleTesterV8.run("no-public-instance-class-fields", rule, tests);
ruleTesterBabel.run("no-public-instance-class-fields", rule, {
  valid: [
    ...tests.valid,
    // TODO: fixme
    // {code: 'class Foo { bar: AType }'},
    // This doesn't catch static class fields.
    // TODO: fixme
    // {code: 'class Foo { static bar: AType }'},
  ],
  invalid: [...tests.invalid],
});
