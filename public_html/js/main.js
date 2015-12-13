require.config({
  urlArgs: "_=" + (new Date()).getTime(),
  baseUrl: "js",
  paths: {
    jquery: "lib/jquery",
    underscore: "lib/underscore",
    backbone: "lib/backbone"
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    }
  }
});

define([
  'backbone',
  'router',
  'api/sync'
], function(
  Backbone,
  router,
  sync
) {
  Backbone.history.start();
});
