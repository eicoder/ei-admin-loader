const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const core = require("@babel/core");
const loaderUtils = require("loader-utils");

const DEFAULT = {
  methodName: "request",
  paramNumber: 2
};

module.exports = function(source) {
  let options = loaderUtils.getOptions(this);
  let ast = parser.parse(source, {
    sourceType: "module", // 支持 es6 module
    plugins: ["dynamicImport"] // 支持动态 import
  });
  options = {
    ...DEFAULT,
    ...options
  };
  if (options.methodName) {
    traverse(ast, {
      CallExpression(path) {
        if (
          path.get("callee.name") &&
          path.get("callee.name").node === options.methodName
        ) {
          const args = path.node.arguments;
          if (args && args.length > options.paramNumber) {
            path.node.arguments = args.slice(0, options.paramNumber);
          }
        }
      }
    });
  }
  return core.transformFromAstSync(ast, null, {
    configFile: false // 屏蔽 babel.config.js，否则会注入 polyfill 使得调试变得困难
  }).code;
};
