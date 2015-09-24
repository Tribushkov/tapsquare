define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    return Backbone.View.extend({

        template: tmpl,
        
        el: $('body'),

        events: {
            "click #edit" : "alert"
        },

        alert: function() {
            alert("RABOTAET, Simple backbone-style onclick alert");
        },

        initialize: function () {

        },
        render: function () {
            $('#page').html(loginTmpl());
            $("#edit1").click(function() {
                alert( "JQUERY ALERT" );
            });
            
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        },

    });

});