var rule = require("../lib/rules/no-dynamic-imports");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterBabel = new RuleTesterV8({
  parser: require.resolve("@babel/eslint-parser"),
});
var ruleTesterV8 = new RuleTesterV8({
  parserOptions: { sourceType: "module", ecmaVersion: 2020 },
});

const tests = {
  valid: [
    { code: 'import foo from "foo"' },
    { code: 'Import("foo").then' },
    { code: 'System.import("foo").then' },
  ],
  invalid: [
    {
      code: 'import("foo")',
      errors: [
        {
          message: "Dynamic import is not supported in undefined",
        },
      ],
    },
  ],
};

ruleTesterBabel.run("no-dynamic-imports (babel)", rule, {
  valid: [
    { code: 'import foo from "foo"' },
    { code: 'Import("foo").then' },
    { code: 'System.import("foo").then' },
  ],
  invalid: [
    {
      code: 'import("foo")',
      errors: [
        {
          message: "Dynamic import is not supported in undefined",
        },
      ],
    },
  ],
});

ruleTesterV8.run("no-dynamic-imports", rule, tests);
ruleTesterBabel.run("no-dynamic-imports", rule, tests);
