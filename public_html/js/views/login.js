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
            "click" : "alert"
        },

        alert: function() {
            
        },

        initialize: function () {

        },

        render: function () {
            $.ajax({
                    type: "POST",
                    url: "/islogged",
                    data: null,
                    success: function(){
                       window.location.replace("/#");
                    },
            });

            $('#page').html(loginTmpl());

           
            $("#idForm").on("submit", function(event) {
                event.preventDefault();
                $.ajax({
                    type: "POST",
                    url: "/signin",
                    data: $(this).serialize(),
                    success: function(){
                        alert("OTPRAVIL");
                    },
                    statusCode: {
                        500: function(data) {
                            // var aa = data.getAllResponseHeaders();
                            console.log(data.getResponseHeader('Error'));
                        }
                    },
                });
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