module.exports = {
  create: (context, badBrowser) => ({
    'Literal[bigint]'(node) {
      context.report(node, `BigInts are not supported in ${badBrowser}`)
    }
  })
}
