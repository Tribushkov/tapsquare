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

    el: 'div#register',
    form: $("form"),
    name: "register",
    user: null,
    backbone: Backbone,

    initialize: function() {
			this.user = new User();
      this.render();
    },

    events: {
      "submit form": "register"
    },

    register: function(event) {
      event.preventDefault();

      for (var i = 0; i < this.user.ValidationErrors.length; i++) {
        console.log(this.user.ValidationErrors[i]);
        $('#' + this.user.ValidationErrors[i]).hide();
      }

      var data = {};

      $("#registerForm").serializeArray().map(function(x) {
        data[x.name] = x.value;
      });

      this.user.set({
        'email': data["email"],
        'name': data["login"],
        'password1': data["password1"],
        'password2': data["password2"]
      });

      if (this.user.isValid()) {
        this.user.register($("#registerForm").serialize());
        if (this.user.registerSuccessful) {
          this.backbone.history.navigate("/#login", true);
        } else {
          this.user.ValidationErrors["alreadyExist"] = true;

          for (var i = 0; i < this.user.ValidationErrors.length; i++) {
            console.log(this.user.ValidationErrors[i]);
            $('#' + this.user.ValidationErrors[i]).hide();
          }
        }
      } else {

        for (var i = 0; i < this.user.ValidationErrors.length; i++) {
          console.log(this.user.ValidationErrors[i]);
          $('#' + this.user.ValidationErrors[i]).hide();
        }
      }

    },

    render: function() {
      this.$el.html(registerTmpl(this.user.toJSON()));
      this.$el.hide();
    },

    show: function() {
      if (this.user.get("logged")) {
        this.backbone.history.navigate("/#", true);
      } else {
        this.trigger('show', {
          'name': this.name
        });
        this.$el.show();
      }
    },

    hide: function() {
      this.$el.hide();
    }

  });

});
