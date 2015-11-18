define([
  'backbone',
  'tmpl/login',
  'models/user'
], function(
  Backbone,
  tmpl,
  User
) {

  return Backbone.View.extend({

    template: tmpl,
    backbone: Backbone,
    el: 'div#login',
    form: $("form"),
    name: "login",
    user: User,

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
      this.user.login(data);
    },

    render: function() {
      this.$el.html(loginTmpl());
      this.$el.hide();
    },


    show: function() {
      this.trigger('show', {
        'name': this.name
      });

      if (this.user.isLogged()) {
        this.backbone.history.navigate("/#", true);
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
