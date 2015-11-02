define([
    'backbone',
    'views/viewmanager',
	'views/scoreboard',
	'views/game',
	'views/login',
	'views/register',
	'views/admin',
	'views/main',
], function(
    Backbone,
    ViewManager,
	scoreboardView,
	gameView,
	loginView,
	registerView,
	adminView,
	mainView
) {
	manager = new ViewManager();

	var scoreboard = new scoreboardView();
	var game = new gameView();
	var login = new loginView();
	var register = new registerView();
	var admin = new adminView();
	var main = new mainView();

	manager.add(scoreboard);
	manager.add(game);
	manager.add(login);
	manager.add(register);
	manager.add(admin);
	manager.add(main);

	var views = manager.getViews();

    var Router = Backbone.Router.extend({
        routes: {
            'score': 'scoreAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'register': 'registerAction',
            'adminpage' : 'adminAction',
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
