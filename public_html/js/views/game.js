define([
	'backbone',
	'tmpl/game',
	'models/user'
], function(
	Backbone,
	tmpl,
	User
) {

	return Backbone.View.extend({

		template: tmpl,
		el: 'div#game',
		name: "game",
		user: User,
		backbone: Backbone,

		initialize: function() {
			var that = this;
			alert("INITIALIZATION WHAT THE FUCK");
			this.render();
			this.user.on('change', this.checkLogin.bind(that));
		},

		checkLogin: function() {
      this.user.fetch();
    },

		events: {

		},

		render: function() {
			this.$el.html(gameTmpl());
			this.$el.hide();
		},
		show: function() {

			if (this.user.get("logged")){
				this.trigger('show',{'name' : this.name});

					this.$el.show();

					var socket = new WebSocket("ws://127.0.0.1:28089/game");

					for (var i = 0; i < 6; i++) {
						for (var j = 0; j < 6; j++) {
							$('.main__gamescene').append('<div class="col-md-2 col-xs-2 col-sm-2 game-cell" id=\"' + i + '_' + j + '\"></div>');
						}
					}

					socket.onopen = function(e) {
					};

					socket.onclose = function(e) {
					};

					socket.onmessage = function(event) {

						var incomingMessage = event.data;

						var obj = JSON.parse(incomingMessage);

						if (obj.time) {
							$("#time").html(Math.floor((60000 - obj.time) / 1000));
						}


						if (obj.square) {
							$("#" + obj.square).toggleClass("hover").css("background-color", obj.color);
						}

						if (obj.score) {
							if (obj.name == "me") {
								$("#myscore").html(obj.score);
							}
							if (obj.name == "enemy") {
								$("#enemyscore").html(obj.score);
							}
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
		},

	});

});
