var rule = require("../lib/rules/no-pipeline-operator");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterV8 = new RuleTesterV8({
  parser: require.resolve("@babel/eslint-parser"),
});

ruleTesterV8.run("no-pipeline-operator", rule, {
  valid: [{ code: "bar(foo)" }],
  invalid: [
    {
      code: "foo |> bar(^^)",
      errors: [
        {
          message: "The Pipeline Operator is not supported in undefined",
        },
      ],
    },
  ],
});
