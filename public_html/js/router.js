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
  ViewManager
) {
  
  var Router = Backbone.Router.extend({

    scoreboard: null,
    game: null,
    login: null,
    register: null,
    admin: null,
    main: null,
    viewManager: null,

    routes: {
      'score': 'scoreAction',
      'game': 'gameAction',
      'login': 'loginAction',
      'register': 'registerAction',
      'adminpage': 'adminAction',
      '': 'defaultActions'
    },

    initialize: function(){
      this.viewManager = new ViewManager();
      main = new mainView();
      register = new registerView();
      login = new loginView();
      scoreboard = new scoreboardView();
      game = new gameView();
      this.viewManager.add(main);
      this.viewManager.add(scoreboard);
      this.viewManager.add(login);
      this.viewManager.add(register);
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
