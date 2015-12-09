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

    checkLogin: function() {
      this.user.fetch();
      this.render();
    },

    toLogout: function() {
      var that = this;
      VK.Auth.logout(this.logoutSuccess.bind(that));
    },

    toLogin: function() {
      var that = this;
      VK.Auth.login(this.loginSuccess.bind(that));
    },

    loginSuccess: function(response) {
      var self = this;
      if (response.session) {
        self.user.set({
          'first_name': response.session.user.first_name,
          'last_name': response.session.user.last_name,
          'id': response.session.user.id,
          'logged': true
        });
      }
    },

    logoutSuccess: function(response){
      var self = this;
      if (response) {
        self.user.set({
          'first_name': null,
          'last_name': null,
          'id': null,
          'logged': false
        });
      }
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
