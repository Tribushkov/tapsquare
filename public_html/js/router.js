define([
    'backbone'
], function(
    Backbone
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
        defaultActions: function() {
            $('#page').html(mainTmpl());
        },
        scoreAction: function() {
            $('#page').html(scoreboardTmpl());
        },
        gameAction: function() {
            $('#page').html(gameTmpl());
        },
        loginAction: function() {
            $('#page').html(loginTmpl());
        },
        registerAction: function() {
            $('#page').html(registerTmpl());
        }
    });
    console.log("after class Router");
    return new Router();
});
