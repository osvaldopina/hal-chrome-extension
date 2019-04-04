var zipFolder = require('zip-folder');

zipFolder('./dist/chrome-plugin', './dist/hal-chrome-plugin.zip', function (err) {
  if (err) {
    console.log('Could not generate extension zip! ', err);
    process.exit('-1');
  } else {
    console.log('Extension zip generated successfully!');
  }
});
