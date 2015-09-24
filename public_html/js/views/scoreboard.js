define([
    'backbone',
    'tmpl/scoreboard'
], function(
    Backbone,
    tmpl
){

    return Backbone.View.extend({

        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
            $('#page').html(scoreboardTmpl());
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        }

    });

});