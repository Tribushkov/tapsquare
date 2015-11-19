define([
  'backbone'
], function(
  Backbone
) {
  var Model = Backbone.Model.extend({

    backbone: Backbone,
    ValidationErrors: {},
    registerSuccessful: null,
    loginSuccesfull: null,

    initialize: function() {

      this.set({
        'logged': false,
        'name': '',
        'email': '',
        'password1': '',
        'password2': ''
      });
    },

    validate: function(attrs) {

      if (!((attrs.name.length > 5) && (attrs.name.length < 12))){
        this.ValidationErrors['nameLength'] = true;
      }

      if (attrs.password1 != attrs.password2){
        this.ValidationErrors['passwordConfirm'] = true;
      }

    },

    fetch: function() {
      var that = this;
      $.ajax({
        type: "POST",
        url: "/islogged",
        data: null
      }).done(function(data, statusText){
        if (statusText == 200){
          that.set({
            "logged": true
          });
        } else {
          that.set({
            "logged": false
          });
        }
      });
    },

    login: function(data1) {
      var that = this;
      $.ajax({
        type: "POST",
        url: "/signin",
        data: data1
      }).done(function(data, statusText, xhr){
        if (statusText == 200){
          that.loginSuccesfull = true;
        } else {
        switch (xhr.getResponseHeader('Error')) {
          case '0':
            that.ValidationErrors["Wrong password"] = true;
            break;
          case '1':
            that.ValidationErrors["User does not exist"] = true;
            break;
          default:
            break;
        }
        that.loginSuccesfull = false;
      }
      });
    },

    logout: function() {
      var that = this;
      $.ajax({
        type: "POST",
        url: "/logout"
      }).done(function(){
        console.log("/logout" + data);
        that.set({
          "logged": false
        });
      });
    },


    register: function(data1) {
      var that = this;
      data1["password"] = data1["password1"];
      $.ajax({
        type: "POST",
        url: "/signup",
        data: data1
      }).done(function(data, statusText, xhr){
        console.log("/signup" + " " + statusText);
        if (statusText == 200){
          that.set({
            "logged": true
          });
          that.registerSuccessful = true;
        } else {
            that.ValidationErrors["engagedEmail"] = true;
            that.registerSuccessful = false;
        }
      });

    },

  });

  return Model;
});
