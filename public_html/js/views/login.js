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
                        window.location.replace("/#");
                    },
                    statusCode: {
                        500: function(data) {
                            $("#passwordControl").show();
                            $("#loginControl").show();
                            $("#loginGroup").removeClass( "form-group has-error" ).addClass( "form-group" );
                            $("#passwordGroup").removeClass( "form-group has-error" ).addClass( "form-group" );
                            switch(data.getResponseHeader('Error')){
                                case '0':
                                    $("#passwordControl").html('<label class="control-label" for="password1" id="passwordLog">Incorrect password</label>')
                                    $("#passwordGroup").removeClass( "form-group" ).addClass( "form-group has-error" );
                                    $("#loginControl").hide();
                                    break
                                case '1':
                                    $("#loginControl").html('<label class="control-label" for="login1" id="passwordLog">User does not exist</label>')
                                    $("#loginGroup").removeClass( "form-group" ).addClass( "form-group has-error" );
                                    $("#passwordControl").hide();
                                    break
                                default:
                                    break
                            }
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