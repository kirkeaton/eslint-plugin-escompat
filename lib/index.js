const path = require("path");
const browserslist = require("browserslist");
const { findConfig } = require("browserslist/node");
const globals = require('globals');
const { name, version, homepage } = require("../package.json");

const plugin = {
  meta: {
    name,
    version,
  },
  configs: {},
  rules: {},
};

const createRule = (name, browserstring, description, { ts = null } = {}) => {
  const rule = require(`./rules/${name}`);
  plugin.rules[name] = {
    meta: Object.assign(
      {
        type: "problem",
        docs: {
          description,
          recommended: true,
          url: `${homepage}/blob/v${version}/docs/${name}.md`,
        },
        fixable: false,
        schema: [],
        deprecated: false,
        replacedBy: null,
      },
      rule.meta || {}
    ),
    create(context) {
      let browsers = browserslist(browserstring);
      const config = findConfig(path.dirname(context.getFilename())) || {
        defaults: "defaults",
      };
      const desiredBrowsers = browserslist(config.defaults);
      const badBrowsers = desiredBrowsers
        .filter((browser) => browsers.indexOf(browser) !== -1)
        .join(", ");
      if (badBrowsers) {
        return rule.create(context, badBrowsers);
      }
      return {};
    },
  };

  // Legacy config
  const configName = `typescript-${ts || "base"}`;
  if (!plugin.configs[configName]) {
    let config = { rules: {} };
    if (ts === 2016) {
      config.extends = [`plugin:escompat/typescript-base`];
    } else if (ts) {
      let previous = ts - 1;
      while (!plugin.configs[`typescript-${previous}`]) previous -= 1;

      config.extends = [`plugin:escompat/typescript-${previous}`];
    }
    plugin.configs[configName] = config;
  }
  plugin.configs[`typescript-base`].rules[`escompat/${name}`] = "off";
  plugin.configs[configName].rules[`escompat/${name}`] = "error";

  // Flat config
  const flatConfigName = `flat/typescript-${ts || "base"}`;
  if (!plugin.configs[flatConfigName]) {
    let config = { plugins: { escompat: plugin }, rules: {} };
    if (ts === 2016) {
      config = { ...plugin.configs['flat/typescript-base'], ...config }
    } else if (ts) {
      let previous = ts - 1;
      while (!plugin.configs[`flat/typescript-${previous}`]) previous -= 1;

      config = { ...plugin.configs[`flat/typescript-${previous}`], ...config }
    }
    plugin.configs[flatConfigName] = config;
  }
  plugin.configs[`flat/typescript-base`].rules[`escompat/${name}`] = "off";
  plugin.configs[flatConfigName].rules[`escompat/${name}`] = "error";
};

// ES2015
createRule(
  "no-edge-destructure-bug",
  "edge < 18",
  "disallow the use of specific destructuring patterns that cause bugs in old Edge"
);

// ES2016
createRule(
  "no-exponentiation-operator",
  "chrome < 52, edge < 14, firefox < 52, safari < 10.1",
  "disallow use of exponentiation operator (**)",
  { ts: 2016 }
);

// ES2018
createRule(
  "no-async-iteration",
  "edge < 79, safari < 12, firefox < 57, chrome < 63",
  "disallow the use of `for await of` style loops",
  { ts: 2018 }
);
createRule(
  "no-async-generator",
  "edge < 79, safari < 12, firefox < 57, chrome < 63",
  "disallow the use of async generator functions",
  { ts: 2018 }
);
createRule(
  "no-object-rest-spread",
  "edge < 79, safari < 11.1, firefox < 55, chrome < 60",
  "disallow object rest/spread patterns",
  { ts: 2018 }
);
createRule(
  "no-regexp-s-flag",
  "edge < 79, safari < 11.1, firefox < 78, chrome < 62",
  "disallow the use of the RegExp `s` flag"
);
createRule(
  "no-regexp-lookbehind",
  "edge < 79, safari < 16.4, firefox < 78, chrome < 62",
  "disallow the use of RegExp lookbehinds"
);
createRule(
  "no-regexp-named-group",
  "edge < 79, safari 11.1, firefox < 78, chrome < 64",
  "disallow the use of RegExp named groups"
);

// ES2019
createRule(
  "no-optional-catch",
  "edge < 79, safari < 11.1, firefox < 58, chrome < 66",
  "always require catch() to have an argument",
  { ts: 2019 }
);

// ES2020
createRule(
  "no-dynamic-imports",
  "edge < 79, safari < 11, firefox < 67, chrome < 63",
  "disallow dynamic import statements"
);
createRule(
  "no-optional-chaining",
  "edge < 80, safari < 13.1, firefox < 72, chrome < 80",
  "disallow the .? optional chaining operator",
  { ts: 2020 }
);
createRule(
  "no-nullish-coalescing",
  "edge < 80, safari < 13.1, firefox < 72, chrome < 80",
  "disallow the ?? nullish coalescing operator",
  { ts: 2020 }
);
createRule(
  "no-bigint",
  "edge < 79, safari < 14, firefox < 68, chrome < 67",
  "disallow bigints"
);

// ES2021
createRule(
  "no-numeric-separators",
  "edge < 79, safari < 13, firefox < 68, chrome < 75",
  "disallow use of numeric separators like 1_000_000",
  { ts: 2021 }
);

// ES2022
createRule(
  "no-public-static-class-fields",
  "edge < 79, safari < 14.5, firefox < 75, chrome < 72",
  "disallow public static class fields like foo = 1",
  { ts: 2022 }
);
createRule(
  "no-public-instance-class-fields",
  "edge < 79, safari < 14.5, firefox < 69, chrome < 72",
  "disallow public class fields like foo = 1",
  { ts: 2022 }
);
createRule(
  "no-computed-public-class-fields",
  "edge < 79, safari < 14.5, firefox < 69, chrome < 74",
  "disallow computed public static or instance class fields like [foo] = 1",
  { ts: 2022 }
);
createRule(
  "no-private-class-fields",
  "edge < 79, safari < 14.5, firefox < 90, chrome < 74",
  "disallow private class fields like #foo = 1",
  { ts: 2022 }
);
createRule(
  "no-class-static-blocks",
  "edge < 94, safari > 0, firefox < 94, chrome < 94",
  "disallow static blocks like `static { x = 1 }`",
  { ts: 2022 }
);

// Proposals...
createRule(
  "no-do-expression",
  "edge > 0, safari > 0, firefox > 0, chrome > 0",
  'disallow "do" expressions'
);
createRule(
  "no-bind-operator",
  "edge > 0, safari > 0, firefox > 0, chrome > 0",
  "disallow the :: bind operator"
);
createRule(
  "no-pipeline-operator",
  "edge > 0, safari > 0, firefox > 0, chrome > 0",
  "disallow the > pipeline operator"
);

plugin.configs.recommended = {
  plugins: ["escompat"],
  env: {
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: Object.keys(plugin.rules).reduce(
    (o, r) => ((o["escompat/" + r] = ["error"]), o),
    {}
  ),
};
plugin.configs['flat/recommended'] = {
  plugins: { escompat: plugin },
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser
    }
  },
  rules: plugin.configs.recommended.rules,
};

plugin.configs.typescript = {
  extends: ["plugin:escompat/typescript-2016"],
};
plugin.configs['flat/typescript'] = {
  plugins: { escompat: plugin },
  ...plugin.configs['flat/typescript-2016'],
}

if (require.main === module) {
  console.log(require("util").inspect(plugin, { depth: Infinity }));
}

module.exports = plugin;
