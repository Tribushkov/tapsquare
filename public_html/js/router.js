define([
    'backbone',
    'views/viewmanager'
], function(
    Backbone,
    ViewManager
) {
    console.log("before class Router");
    var Router = Backbone.Router.extend({
        routes: {
            'score': 'scoreAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'register': 'registerAction',
            '': 'defaultActions'
        },

        myManager: null,

        initialize: function () {
            this.myManager = new ViewManager(); //Создал мэнеджер вьюх
        },

        showView: function(view) {
            // переходим на менеджер вьюх, передавая ему нужную вьюху
            this.myManager.displayView(view); 
        },

          /* экшены для переходов по вьюхам */
        defaultActions: function() {
            this.showView(this.myManager.MAIN_VIEW);
            // this.showView('MAIN_VIEW');
        },

        scoreAction: function() {
            this.showView(this.myManager.SCOREBOARD_VIEW);
            // $('#page').html(scoreboardTmpl());
        },

        gameAction: function() {
            this.showView(this.myManager.GAME_VIEW);
        },

        loginAction: function() {
            this.showView(this.myManager.LOGIN_VIEW);       
        },

        registerAction: function() {
            this.showView(this.myManager.REGISTER_VIEW);  
        }
            
    });
    console.log("after class Router");
    return new Router();
});
