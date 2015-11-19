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
    user: null,

    initialize: function() {
      this.user = new User();
      this.render();
    },

    events: {
      "submit form": "login"
    },

    login: function(event) {
      event.preventDefault();
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
      if (this.user.get("logged")) {
        this.backbone.history.navigate("/#", true);
      } else {
        this.$el.show();
      }
    },

    hide: function() {
      this.$el.hide();
    },


  });

});
