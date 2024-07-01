var rule = require("../lib/rules/no-regexp-named-group");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2020 } });

ruleTesterV8.run("no-regexp-named-group", rule, {
  valid: [
    { code: "/(?:a)/" },
    { code: "/(?:a)/g" },
    { code: 'RegExp("(?:a)b")' },
    { code: 'RegExp("(?:a)b", "g")' },
  ],
  invalid: [
    {
      code: "/(?<name>)/",
      errors: [
        {
          message: "RegExp named groups are not supported in undefined",
        },
      ],
    },
    {
      code: 'new RegExp("(?<name>)")',
      errors: [
        {
          message: "RegExp named groups are not supported in undefined",
        },
      ],
    },
    {
      code: "/(?<$name>)/",
      errors: [
        {
          message: "RegExp named groups are not supported in undefined",
        },
      ],
    },
    {
      code: "/(?<_name>)/",
      errors: [
        {
          message: "RegExp named groups are not supported in undefined",
        },
      ],
    },
  ],
});
