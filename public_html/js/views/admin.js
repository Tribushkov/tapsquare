define([
    'backbone',
    'tmpl/admin'
], function(
    Backbone,
    tmpl
) {

    return Backbone.View.extend({

        template: tmpl,

        initialize: function() {

        },

        render: function() {
            $('#page').html(adminTmpl());
        },

        show: function() {

        },

        hide: function() {
        
        }

    });

});
