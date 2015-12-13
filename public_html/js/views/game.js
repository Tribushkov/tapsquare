define([
  'backbone',
  'tmpl/game',
], function(
  Backbone,
  tmpl
) {

  return Backbone.View.extend({

    template: tmpl,
    el: 'div#game',
    name: "game",
    backbone: Backbone,

    initialize: function() {
      var that = this;
      this.render();
      this.model.on('change', this.checkLogin.bind(that));
    },

    checkLogin: function() {
      this.render();
    },

    events: {
      'click #back': 'backtoMenu',
    },

    backtoMenu: function() {},

    render: function() {
      this.$el.html(gameTmpl());
      this.$el.hide();
    },

    show: function() {

      if (this.model.get("logged")) {
        this.trigger('show', {
          'name': this.name
        });

        this.$el.show();

        var socket = new WebSocket("ws://127.0.0.1:28089/game");

        $('.game__game-field').html('');
        for (var i = 0; i < 6; i++) {
          for (var j = 0; j < 6; j++) {
            $('.game__game-field').append('<div class="col-md-2 col-xs-2 col-sm-2 game__game-field__game-cell" id=\"' + i + '_' + j + '\"><div class="game__game-field__game-cell__inner"></div>');
          }
        }

        socket.onopen = function(e) {

        };

        socket.onclose = function(e) {};

        socket.onmessage = function(event) {

          var incomingMessage = event.data;

          var obj = JSON.parse(incomingMessage);

          if (obj.time) {
            $("#time").html(Math.floor((60000 - obj.time) / 1000));
          }

          if (obj.status) {
            if (obj.status == "start") {

            }
            if (obj.status == "finish") {
              if (obj.win == "0") {
                $('#time').html('DRAW');
              }
              if (obj.win == "1") {
                $('#time').html('YOU WIN');
              }
              if (obj.win == "2") {
                $('#time').html('YOU LOOSE');
              }
            }
          }


          if (obj.square) {
            $("#" + obj.square).toggleClass("game__game-field__game-cell__inner_changed").css("border-color", obj.color);
          }

          if (obj.score) {
            if (obj.name == "me") {
              $("#myscore").html(obj.score);
            }
            if (obj.name == "enemy") {
              $("#enemyscore").html(obj.score);
            }
          }



        };

        $(".game-cell").click(function() {
          socket.send($(this).attr('id'));
        });

      } else {

        this.backbone.history.navigate('#');

      }

    },


    hide: function() {
      this.$el.hide();
      $('.game__game-field').html('');
    },

  });

});
