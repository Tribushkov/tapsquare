define([
    'views/main',
    'views/login',
    'views/register',
    'views/game',
    'views/scoreboard',
    'views/admin'
], function(
    Main,
    Login,
    Register,
    Game,
    Scoreboard,
    Admin
){

    var ViewManager = Backbone.View.extend({

        GAME_VIEW: "game",
        LOGIN_VIEW: "login",
        REGISTER_VIEW: "register",
        MAIN_VIEW: "main",
        SCOREBOARD_VIEW: "scoreboard",
        ADMIN_VIEW: "admin",

        views: {
            GAME_VIEW: null,
            LOGIN_VIEW: null,
            MAIN_VIEW: null,
            SCOREBOARD_VIEW: null,
            REGISTER_VIEW: null,
            ADMIN_VIEW: null
        },

        currentView: null,

        initialize: function () {
            this.views[this.MAIN_VIEW] = new Main();
            this.views[this.LOGIN_VIEW] = new Login();
            this.views[this.REGISTER_VIEW] = new Register();
            this.views[this.GAME_VIEW] = new Game();
            this.views[this.SCOREBOARD_VIEW] = new Scoreboard();
            this.views[this.ADMIN_VIEW] = new Admin();
        },

        displayView: function(viewKey) {
            var view = this.views[viewKey];
            view.render();
            this.currentView = view;           
        },

    });

    return ViewManager;
});