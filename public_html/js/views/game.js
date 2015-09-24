define([
    'backbone',
    'tmpl/game'
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
            $('#page').html(gameTmpl());
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        }

    });

});