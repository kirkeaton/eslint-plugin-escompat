var rule = require("../lib/rules/no-regexp-s-flag");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2018 } });

ruleTesterV8.run("no-regexp-s-flag", rule, {
  valid: [
    { code: "/foo.bar/" },
    { code: "/foo.bar/g" },
    { code: 'new RegExp("foo.bar")' },
    { code: 'new RegExp("foo.bar", flags)' },
    { code: 'new RegExp("foo.bar", "u")' },
    { code: 'new RegExp("foo.bar", "g")' },
    { code: 'RegExp("foo.bar", "g")' },
  ],
  invalid: [
    {
      code: "/foo.bar/s",
      errors: [
        {
          message: 'RegExp "s" flag is not supported in undefined',
        },
      ],
    },
    {
      code: 'new RegExp("foo.bar", "s")',
      errors: [
        {
          message: 'RegExp "s" flag is not supported in undefined',
        },
      ],
    },
    {
      code: 'new RegExp("foo.bar", `s`)',
      errors: [
        {
          message: 'RegExp "s" flag is not supported in undefined',
        },
      ],
    },
    {
      code: 'RegExp("foo.bar", "s")',
      errors: [
        {
          message: 'RegExp "s" flag is not supported in undefined',
        },
      ],
    },
  ],
});
