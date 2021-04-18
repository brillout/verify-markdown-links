const { exec } = require("child_process");
const { resolve, dirname } = require("path");

Object.assign(module.exports, { verifyMarkdownLinks });

// We don't use remark's API because it behaves differently than the CLI

function verifyMarkdownLinks() {
  remark(["-u", require.resolve("remark-validate-links"), process.cwd()]);
}

function remark(args) {
  const pkgPath = require.resolve("remark-cli/package.json");
  const pkg = require(pkgPath);
  const cliPath = require.resolve(resolve(dirname(pkgPath), pkg.bin["remark"]));
  process.argv.push(...args);
  require(cliPath);
}
/*

function runCommand(cmd, cwd = process.cwd()) {
  const { promise, resolvePromise } = genPromise();

  const options = {};
  exec(cmd, { cwd }, (err, _stdout, _stderr) => {
    clearTimeout(timeout);
    if (err) {
      resolvePromise(err);
    } else {
      resolvePromise();
    }
  });

  return promise;
}

function genPromise() {
  let resolvePromise;
  let rejectPromise;
  const promise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });
  return { promise, resolvePromise, rejectPromise };
}
*/
