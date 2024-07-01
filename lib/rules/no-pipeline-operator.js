module.exports = {
  create: (context, badBrowser) => ({
    'BinaryExpression[operator="|>"]'(node) {
      context.report(node, `The Pipeline Operator is not supported in ${badBrowser}`)
    }
  })
}
