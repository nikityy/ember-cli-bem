/* eslint-env node */
'use strict';

var HtmlbarsPlugin = require('./lib/htmlbars-plugin');

module.exports = {

  name: 'ember-cli-bem',

  setupPreprocessorRegistry: function(type, registry) {
    // Skip if we're setting up this addon's own registry
    if (type !== 'parent') { return; }

    registry.add('htmlbars-ast-plugin', {
      name: 'ember-css-modules',
      plugin: HtmlbarsPlugin,
      baseDir: function() {
        return __dirname;
      }
    });
  },

};
