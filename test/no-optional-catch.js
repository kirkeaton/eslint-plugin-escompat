var rule = require("../lib/rules/no-optional-catch");
var RuleTesterV8 = require("eslint-v8").RuleTester;
var RuleTesterV9 = require("eslint-v9").RuleTester;

var ruleTesterBabel = new RuleTesterV8({
  parser: require.resolve("@babel/eslint-parser"),
});
var ruleTesterV8 = new RuleTesterV8({ parserOptions: { ecmaVersion: 2019 } });

const tests = {
  valid: [
    { code: "try { foo() } catch (error) {}" },
    { code: "try { foo() } catch (e) {}" },
    { code: "try { foo() } catch (_) {}" },
  ],
  invalid: [
    {
      code: "try { foo() } catch {}",
      errors: [
        {
          message: "Optional Catch Parameters are not supported in undefined",
        },
      ],
    },
  ],
};

ruleTesterV8.run("no-optional-catch", rule, tests);
ruleTesterBabel.run("no-optional-catch (babel)", rule, tests);
