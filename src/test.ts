// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'core-js/es7/reflect';
import 'zone.js/dist/zone-testing';

declare const require: any;

const context = require.context('./', true, /\.spec\.ts$/);

context.keys().map(context);
