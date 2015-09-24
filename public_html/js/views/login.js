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

                    // .ajaxError() {
                    //     alert("405=(");
                    // }
                    // 405: function(){
                    //     alert("405=(");
                    // }
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