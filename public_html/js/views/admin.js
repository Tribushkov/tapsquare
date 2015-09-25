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
            $.ajax({
                    type: "GET",
                    url: "/admin",
                    data: null,
                    success: function(data){
                        var data = JSON.stringify(data);
                        data = JSON.parse(data);

                        try {
                            var allUsers = new Array();
                            allUsers = data['users'];
                            console.log(allUsers);
                            for (i = 0; i < allUsers.length; i++){
                                $("#usersTable").append("<tr><td>" + allUsers[i] + "</td></tr>")
                            }
                        } catch(error) {
                            $("#usersTable").append("<tr><td>Nobody</td></tr>")
                        }
                        
                        try {
                            var sessions = new Array(); 
                            sessions = data['sessions'];
                            for (i = 0; i < sessions.length; i++){
                                $("#loggedTable").append("<tr><td>" + sessions[i] + "</td></tr>")
                            }
                        } catch(error) {
                            $("#loggedTable").append("<tr><td>Nobody</td></tr>")
                        }

                        
                    },
                    dataType: "json",

            //         // statusCode: {
            //         //     404: function() {
            //         //         alert( "page not found" );
            //         //  }


            //         // .ajaxError() {
            //         //     alert("405=(");
            //         // }
            //         // 405: function(){
            //         //     alert("405=(");
            //         // }
                });
            // $.get("/admin", function(data, status, xhr){
            //     alert(JSON.stringify(data));
            // }, "json");
        },

        show: function() {

        },

        hide: function() {
        
        }

    });

});
