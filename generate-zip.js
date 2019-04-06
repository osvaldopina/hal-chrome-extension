var zipFolder = require('zip-folder');

zipFolder('./dist/chrome-extension', './dist/hal-chrome-extension.zip', function (err) {
  if (err) {
    console.log('Could not generate extension zip! ', err);
    process.exit('-1');
  } else {
    console.log('Extension zip generated successfully!');
  }
});
