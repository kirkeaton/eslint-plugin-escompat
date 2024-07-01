var rule = require("../lib/rules/no-class-static-blocks");
var RuleTesterV8 = require("eslint-v8").RuleTester;

var ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2022 } });

ruleTesterV8.run("no-class-static-blocks", rule, {
  valid: [{ code: "class Foo { static x = 1 }" }],
  invalid: [
    {
      code: "class Foo { static { x = 1 } }",
      errors: [
        {
          message: "Class Static Blocks are not supported in undefined",
        },
      ],
    },
  ],
});
