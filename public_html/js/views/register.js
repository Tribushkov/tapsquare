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

		initialize: function() {
			this.render();
		},

		events: {
			"submit form": "register"
		},

		register: function(event) {
			event.preventDefault();
			this.garbageCleaner()
			var ready = true;
			if ($("#password1").val() != $("#password2").val()){
				$("#passwordNotification").html('<label class="control-label" for="inputWarning2">Passwords does not match</label>')
				$("#password1Group").addClass("has-error");
				$("#password2Group").addClass("has-error");
				ready = false;
			}
			if($("#password1").val() == "" ){
				$("#password1Group").addClass("has-error");
				$("#passwordNotification").html('<label class="control-label" for="inputWarning2">Empty field</label>');
				ready = false;
			}
			if ($("#password2").val() == ""){
				$("#password2Group").addClass("has-error");
				$("#password2Notification").html('<label class="control-label" for="inputWarning2">Empty field</label>');
				ready = false;
			}
			if ($("#exampleemail").val() == ""){
				$("#emailGroup").addClass("has-error");
				$("#emailNotification").html('<label class="control-label" for="inputWarning2">Empty field</label>');
				ready = false;
			}
			if ($("#examplelogin").val() == ""){
				$("#loginGroup").addClass("has-error");
				$("#loginNotification").html('<label class="control-label" for="inputWarning2">Empty field</label>');
				ready = false;
			}
			if (ready){
				var data = $("#registerForm").serialize();
				this.user.register(data);
			} else {
				$("#registerForm").addClass('animated shake');
			}

		},

		garbageCleaner: function(){
			$("#passwordNotification").html('');
			$("#password2Notification").html('');
			$("#emailNotification").html('');
			$("#loginNotification").html('');
			$("#loginGroup").removeClass("has-error");
			$("#emailGroup").removeClass("has-error");
			$("#password1Group").removeClass("has-error");
			$("#password2Group").removeClass("has-error");
			$("#registerForm").removeClass('animated shake');
		},

		render: function() {
			this.$el.html(registerTmpl());
			this.$el.hide();
		},

		show: function() {
			if (this.user.isLogged()){
				backbone.history.navigate("/#", true);
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
