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


        },
        show: function () {
            this.$el.show();

            var socket = new WebSocket("ws://localhost:8080/game");

            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 6; j++) {
                    $('.main__gamescene').append('<div class="col-md-2 col-xs-2 col-sm-2 game-cell" id=\"' + i + '_' + j +'\"></div>');
                }
            }

            socket.onopen = function(e){ };

            socket.onclose = function(e){
                 alert("FINISHED CONNECTION");
            };

            socket.onmessage = function(event) {

                var incomingMessage = event.data;

                // var obj = JSON && JSON.parse(incomingMessage) || $.parseJSON(incomingMessage);
                var obj = JSON.parse(incomingMessage);


                if (obj.time){
                  $("#time").html(Math.floor((20000-obj.time)/1000));
                }



                if (obj.square){
                  $("#"+ obj.square).toggleClass("hover").css("background-color",obj.color);
                }
                if (obj.score){
                  if (obj.name == "me"){
                    $("#myscore").html(obj.score);
                  }
                  if (obj.name == "enemy"){
                    $("#enemyscore").html(obj.score);
                  }
                }

                if (obj.status == "finish"){
                  if (obj.win){
                    $('.main__gamescene').html('<h1>YOU WIN!;)</h1>');
                  } else {
                    $('.main__gamescene').html('<h1>YOU LOOSE!!!KEK</h1>');
                  }
                  socket.close();
                }

            };

            $(".game-cell").click(function() {
                socket.send($(this).attr('id'));
            });

        },


        hide: function () {
            this.$el.hide();
        },

    });

});
