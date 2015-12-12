define([
  'backbone',
  'views/scoreboard',
  'views/game',
  'views/main',
  'views/viewmanager',
  'models/user',
  'collections/scoreboard'
], function(
  Backbone,
  scoreboardView,
  gameView,
  mainView,
  ViewManager,
  user,
  scores
) {

  var Router = Backbone.Router.extend({

    scoreboard: null,
    game: null,
    main: null,
    viewManager: null,

    routes: {
      'score': 'scoreAction',
      'game': 'gameAction',
      '': 'defaultActions'
    },

    initialize: function() {
      this.viewManager = new ViewManager();
      main = new mainView({
        model: user
      });
      scoreboard = new scoreboardView({
        model: scores
      });
      game = new gameView({
        model: user
      });
      this.viewManager.add(main);
      this.viewManager.add(scoreboard);
      this.viewManager.add(game);
    },

    defaultActions: function() {
      main.show();
    },

    scoreAction: function() {
      scoreboard.show();
    },

    gameAction: function() {
      game.show();
    },


  });
  return new Router();
});
