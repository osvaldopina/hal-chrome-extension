const replace = require('replace-in-file');
const packageJson = require('./package.json');

const changes = replace.sync({
  files: './dist/chrome-plugin/manifest.json',
  from: /\${project-version}/g,
  to: packageJson.version,
});
if (changes.length === 0) {
  console.log("Could not adjust manifest version from package.json version!");
  process.exit('-1');
}
