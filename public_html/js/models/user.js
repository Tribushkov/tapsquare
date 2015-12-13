define([
  'backbone'
], function(
  Backbone
) {
  var Model = Backbone.Model.extend({

    backbone: Backbone,

    url: {
      'create': '/user/signup',
      'update': '/user/signin',
      'read': '/user/islogged',
      'delete': '/user/logout'
    },

    defaults: {
      'user_id': null,
      'logged': false,
      'score': 0
    },

    initialize: function(){
      this.set({
        'user_id': null,
        'logged': false,
        'score': 0
      });
      this.sync('read', this, this.optionsFetch);
    },

    uninitialize: function() {
      this.set({
        'user_id': null,
        'logged': false,
        'score': 0
      })
    },

    optionsCreate: ({
      success: function(model) {
          Model.prototype.sync('update',   model,   model.optionsUpdate);
      },
      error: function(model) {},
    }),

    optionsFetch: ({
      success: function(model) {
        model.set({
          'logged': true
        });
      },
      error: function(model, response, parse) {}
    }),

    optionsUpdate: ({
      success: function(model) {
        model.set({
          'logged': true
        });
      },
      error: function(model) {}
    }),

    optionsDelete: ({
      success: function(model) {
        model.uninitialize();
      },
      error: function() {}
    }),

    login: function() {
      var that = this;
      VK.Auth.login(this.loginSuccess.bind(that));
    },

    logout: function() {
      var that = this;
      VK.Auth.logout(
        //callback does not work hmm
      );

      //just for debugging KOSTUL'
      this.sync('delete', this, this.optionsDelete);

    },


    loginSuccess: function(response) {
      var self = this;
      if (response.session) {
        self.set({'user_id': response.session.user.id}, {silent : true});
        this.sync('create', this, this.optionsCreate);
      }
    },

    logoutSuccess: function(response) {
      var self = this;
      if (response) {
        this.sync('delete', self, self.optionsDelete);
      }
    },

  });

  return new Model();

});
