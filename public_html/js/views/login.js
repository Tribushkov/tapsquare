define([
	'backbone',
	'tmpl/login',
	'models/auth'
], function(
	Backbone,
	tmpl,
	model
) {

	return Backbone.View.extend({

		template: tmpl,
		backbone: Backbone,
		el: 'div#login',
		model: new model(),
		form: $("form"),
		name: "login",

		initialize: function() {
			this.render();
		},

		events: {
			"submit form": "login"
		},

		login: function(event) {
			event.preventDefault();
			this.garbageCleaner();
			var data = $("#idForm").serialize();
			model.login(data);
		},



		render: function() {
			this.$el.html(loginTmpl());
			this.$el.hide();
		},


		show: function() {
			this.trigger('show',{'name' : this.name});

			if (myUser.get('isLogged')){
				backbone.history.navigate("/#", true);
			} else {

			this.$el.show();
			this.garbageCleaner();
		}
		},

		hide: function() {
			this.$el.hide();
		},

		garbageCleaner: function() {
			$("#passwordControl").html('');
			$("#loginControl").html('');
			$("#passwordGroup").removeClass("has-error");
			$("#loginGroup").removeClass("has-error");
		},

	});

});
