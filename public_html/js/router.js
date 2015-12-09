define([
  'backbone',
  'views/scoreboard',
  'views/game',
  'views/login',
  'views/register',
  'views/admin',
  'views/main',
  'views/viewmanager'
], function(
  Backbone,
  scoreboardView,
  gameView,
  loginView,
  registerView,
  adminView,
  mainView,
  viewManager
) {

    var main = new mainView();
    var register = new registerView();
    var login = new loginView();
    var scoreboard = new scoreboardView();
    var game = new gameView();
    viewManager.add(main);
    viewManager.add(scoreboard);
    viewManager.add(login);
    viewManager.add(register);
    viewManager.add(game);

  var Router = Backbone.Router.extend({

    scoreboard: null,
    game: null,
    login: null,
    register: null,
    admin: null,
    main: null,

    routes: {
      'score': 'scoreAction',
      'game': 'gameAction',
      'login': 'loginAction',
      'register': 'registerAction',
      'adminpage': 'adminAction',
      '': 'defaultActions'
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

    loginAction: function() {
      login.show();
    },

    registerAction: function() {
      register.show();
    },

    adminAction: function() {
      admin.show();
    }

  });
  return new Router();
});
