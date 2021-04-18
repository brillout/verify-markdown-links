const remarkValidateLinksPath = require.resolve("remark-validate-links");
const remarkCliPkgPath = require.resolve("remark-cli/package.json");
const { resolve, dirname } = require("path");

Object.assign(module.exports, { verifyMarkdownLinks });

function verifyMarkdownLinks() {
  remark(["-u", remarkValidateLinksPath, process.cwd()]);
}

// We don't use remark's API because it behaves differently than the CLI
function remark(args) {
  const pkg = require(remarkCliPkgPath);
  const cliPath = require.resolve(resolve(dirname(remarkCliPkgPath), pkg.bin["remark"]));
  process.argv.push(...args);
  require(cliPath);
}
