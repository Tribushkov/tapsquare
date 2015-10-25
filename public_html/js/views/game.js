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
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
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

            var socket = new WebSocket("ws://localhost:1488/game");

            socket.onopen = function(e){
                // alert("СОЕДИНЕНИЕ");
            };

            socket.onmessage = function(event) {
                var incomingMessage = event.data;
                alert(incomingMessage);
                var obj = JSON && JSON.parse(incomingMessage) || $.parseJSON(incomingMessage);
                // alert("#" + obj.square);
                $("#" + obj.square).addClass('hover');
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
