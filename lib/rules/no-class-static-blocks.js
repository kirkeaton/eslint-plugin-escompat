module.exports = {
  create: (context, badBrowser) => ({
    StaticBlock(node) {
      context.report(
        node,
        `Class Static Blocks are not supported in ${badBrowser}`,
      );
    },
  }),
};
