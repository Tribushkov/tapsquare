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
      VK.Auth.getLoginStatus(function(response){
        // alert("USER FETCHED:" + JSON.stringify(response));
        if (response.session){
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

    // login: function(data1) {
    //   var that = this;
    //   $.ajax({
    //     type: "POST",
    //     url: "/signin",
    //     data: data1
    //   }).done(function(data, statusText, xhr) {
    //     if (statusText == 200) {
    //       that.loginSuccesfull = true;
    //     } else {
    //       switch (xhr.getResponseHeader('Error')) {
    //         case '0':
    //           that.ValidationErrors["Wrong password"] = true;
    //           break;
    //         case '1':
    //           that.ValidationErrors["User does not exist"] = true;
    //           break;
    //         default:
    //           break;
    //       }
    //       that.loginSuccesfull = false;
    //     }
    //   });
    // },

    // logout: function() {
    //   var that = this;
    //   $.ajax({
    //     type: "POST",
    //     url: "/logout"
    //   }).done(function() {
    //     console.log("/logout" + data);
    //     that.set({
    //       "logged": false
    //     });
    //   });
    // },
    //
    //
    // register: function(data1) {
    //   var that = this;
    //   $.ajax({
    //     type: "POST",
    //     url: "/signup",
    //     data: data1
    //   }).done(function(data, statusText, xhr) {
    //     if (statusText == 200) {
    //       that.set({'successRegistration' : true});
    //     } else {
    //       that.set({'successRegistration' : false});
    //     }
    //   });
    //
    // },

    // validate: function(attrs, options) {
    //   var errors = [];
    //   this.set({
    //     'validationErrors': null
    //   });
    //   if (attrs.email == "") {
    //     errors.push({
    //       "message": "Введите email",
    //       "field": "email"
    //     });
    //   }
    //   if (attrs.password == "") {
    //     errors.push({
    //       "message": "Введите пароль",
    //       "field": "password"
    //     });
    //   }
    //   if (errors.length != 0) {
    //     this.set({
    //       'validationErrors': errors
    //     });
    //     return 'error';
    //   }
    //
    // }

  });

  return new Model;
});
