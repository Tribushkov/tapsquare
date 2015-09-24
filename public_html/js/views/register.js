define([
    'backbone',
    'tmpl/register'
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
            $('#page').html(registerTmpl());
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        }

    });

});