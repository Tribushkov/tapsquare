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
            $("#registerForm").on("submit", function(event) {
                event.preventDefault();
                $.ajax({
                    type: "POST",
                    url: "/signup",
                    data: $(this).serialize(),
                    success: function(){
                        alert("Zaregistrirovalsya!");
                        window.location.replace("/#login");
                    }
                });
            });
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        }

    });

});