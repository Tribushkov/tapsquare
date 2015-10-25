define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    return Backbone.View.extend({

        template: tmpl,
        el: 'div#game',
        initialize: function () {
            // TODO
        },

        events: {

            'click .game_cell': 'burp'

        },

        burp: function(){

        },

        render: function () {
            this.$el.html(gameTmpl());
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    $('.main__gamescene').append('<div class="game-cell" id=\"' + i + '_' + j +'\"></div>');
                }
            }

        },
        show: function () {
            this.$el.show();

            $.ajax({
                    type: "POST",
                    url: "/game",
                    data: null,
                    success: function(){
                       // alert("ZAPROS OTPRAVIL I POLUCHIL OTVET 200 OK")
                    },
            });

            var socket = new WebSocket("ws://localhost:8080/game");

            socket.onopen = function(e){
                // alert("СОЕДИНЕНИЕ");
            };

            socket.onclose = function(e){
                 alert("FINISHED CONNECTION");
            };

            socket.onmessage = function(event) {
                var incomingMessage = event.data;
                var obj = JSON && JSON.parse(incomingMessage) || $.parseJSON(incomingMessage);
                
                if (obj.square) {
                  $("#" + obj.square).removeClass('hover');
                  $("#" + obj.square).addClass('hover');
                  $("#" + obj.square).css("background-color", obj.color);
                }

                if (obj.status == "finish") {
                  alert(obj.win);
                  // $("#" + obj.square).css("background-color", obj.color);
                }

                if (obj.time) {
                    $("#time").html(obj.time);
                }
            };

            $(".game-cell").click(function() {
                // alert( $(this).attr('id') );
                socket.send($(this).attr('id'));
            });

            $(".game-cell hover").click(function() {
                // alert( $(this).attr('id') );
                socket.send($(this).attr('id'));
            });

        },


        hide: function () {
            this.$el.hide();
        },

    });

});
