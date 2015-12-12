define([
  'backbone'
], function(
  Backbone
) {
  var Model = Backbone.Model.extend({

    backbone: Backbone,
    url: 'user',
    ValidationErrors: null,

    defaults: {
      'id': null,
      'first_name': null,
      'last_name': null,
      'logged': false,
      'score': 0,
      'commonScore': 0
    },

    initialize: function() {},

    fetch: function() {
      var that = this;
      VK.Auth.getLoginStatus(function(response) {
        if (response.session) {
          that.set({
            'first_name': response.session.user.first_name,
            'last_name': response.session.user.last_name,
            'id': response.session.user.id,
            'logged': true
          });
        } else {
          that.set({
            'first_name': null,
            'last_name': null,
            'id': null,
            'logged': false
          });
        }
      });
    },

    logout: function() {
      var that = this;
      VK.Auth.logout(this.logoutSuccess.bind(that));
    },

    login: function() {
      var that = this;
      VK.Auth.login(this.loginSuccess.bind(that));
    },

    logoutSuccess: function(response) {
      var self = this;
      if (response) {
        self.set({
          'first_name': null,
          'last_name': null,
          'id': null,
          'logged': false,
          'score': 0,
          'commonScore': 0
        });
      }
    },

    loginSuccess: function(response) {
      var self = this;
      if (response.session) {
        self.set({
          'first_name': response.session.user.first_name,
          'last_name': response.session.user.last_name,
          'id': response.session.user.id,
          'logged': true
        });
      }
      //TODO block user here
      data = {};
      data["user_id"] = response.session.user.id;
      $.ajax({
        url: "/signup",
        method: "POST",
        data: data
      }).done(function() {
        $.ajax({
          url: "/signin",
          method: "POST",
          data: data
        }).done(function() {
          //TODO unblock user here
        });
      });
    },

  });

  return new Model();
});
