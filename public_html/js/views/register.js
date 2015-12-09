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
    name: "register",
    user: User,
    // form: $('form'),
    backbone: Backbone,
    formErrors: null,

    initialize: function() {
      this.formErrors = [];
      // this.user = new User();
      this.render();
    },

    events: {
      "submit form": "register"
    },

    approveValidation: function(data) {
      var errors = [];
      if (data['password1'] != data['password2']) {
        errors.push({
          'message': 'Введенные пароли не совпадают',
          'field': 'password1 & password2'
        });
      }
      return errors;
    },

    register: function(event) {
      event.preventDefault();
      var data = {};

      $.each($('#registerForm').serializeArray(), function() {
        data[this.name] = this.value;
      });

      this.user.set({
        'email': data['email'],
        'password': data['password1']
      });

      this.user.set({"validationErrors": null});
      if ((this.approveValidation(data).length == 0) && this.user.isValid()) {
        this.user.register(data);
        if (this.user.get("successRegistration")){
          this.backbone.Backbone.history.navigate("#login");
        } else {
          alert("ТАКОЙ ЭМАЙЛ УЖЕ ЗАНЯТ")
        }
      } else {
        this.formErrors = JSON.stringify(this.approveValidation(data)) + JSON.stringify(this.user.get("validationErrors"));
        alert(this.formErrors);
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
