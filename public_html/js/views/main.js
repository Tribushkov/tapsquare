define([
  'backbone',
  'tmpl/main',
  'models/user'
], function(
  Backbone,
  tmpl,
  User
) {

  return Backbone.View.extend({

    template: tmpl,
    el: 'div#main',
    name: "main",
    user: User,
    loginButton: "#login",
    logoutButton: "#logout",

    events: {
      "click #logout": "toLogout",
      "click #login": 'toLogin'
    },

    initialize: function() {
      var that = this;
      alert("INITIALIZATION WHAT THE FUCK");
      this.render();
      this.user.on('change', this.checkLogin.bind(that));
    },

    toLogout: function(){
      this.user.logout();
    },

    toLogin: function(){
      this.user.login();
    },

    checkLogin: function() {
      this.user.fetch();
      this.render();
    },

    render: function() {
      this.$el.html(mainTmpl(this.user.toJSON()));
    },

    show: function() {
      this.trigger('show', {
        'name': this.name
      });
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }

  });

});
