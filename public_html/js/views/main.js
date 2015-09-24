define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
) {

    return Backbone.View.extend({

        template: tmpl,

        initialize: function() {

        },

        render: function() {
            $('#page').html(mainTmpl());
        },

        show: function() {

        },

        hide: function() {
        
        }

    });

});
