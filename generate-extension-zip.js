var zipFolder = require('zip-folder');

zipFolder('./dist/chrome-plugin', './dist/extension-zip/extension.zip', function(err) {
    if(err) {
        console.log('oh no!', err);
    } else {
        console.log('EXCELLENT');
    }
});
