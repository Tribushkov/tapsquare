define([
	'backbone',
	'tmpl/register',
	'models/user'
], function(
	Backbone,
	tmpl,
	User
) {

	return Backbone.View.extend({

		template: tmpl,
		el: 'div#register',
		form: $("form"),
		name: "register",
		user: User,
		backbone: Backbone,

		initialize: function() {
			this.render();
		},

		events: {
			"submit form": "register"
		},

		register: function(event) {
			event.preventDefault();
			var data = {};
			$("#registerForm").serializeArray().map(function(x){data[x.name] = x.value;});

			this.user.set({
				'email': data["email"],
				'name': data["login"],
				'password': data["password1"]
			})

			//если пароли введенные на равны между собой, то,
			//в противном случае, если все норм, то валидируем уже юзером ---->

			if (this.user.isValid()){
				//все валидационные ошибки обработать
			}


		},

		render: function() {
			this.$el.html(registerTmpl());
			this.$el.hide();
		},

		show: function() {
			if (this.user.get("logged")){
				this.backbone.history.navigate("/#", true);
			} else {
				this.trigger('show',{'name' : this.name});
				this.$el.show();
			}
		},

		hide: function() {
			this.$el.hide();
		}

	});

});
