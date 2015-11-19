define([
  'backbone'
], function(
  Backbone
) {
  var Model = Backbone.Model.extend({

    backbone: Backbone,

    initialize: function() {
      this.set({
        'logged': false,
        'name': '',
        'email': '',
        'password': '',
        'ValidationErrors': {}
      });
    },

    validate: function(attrs) {
      console.log(attrs);
    },

    fetch: function() {
      var that = this;
      $.ajax({
        type: "POST",
        url: "/islogged",
        data: null,
        success: function() {
          that.set({
            "logged": true
          });
        },
        statusCode: {
          403: function() {
            that.set({
              "logged": false
            });
          }
        }
      });
    },

    login: function(data1) {
      var that = this;
      $.ajax({
        type: "POST",
        url: "/signin",
        data: data1
      }).done(function(data){
        console.log(data);
        switch (data.getResponseHeader('Error')) { ///здесь 403 код ответа, в нормальном случае - 200
          case '0':
            return "Wrong password"
            break;
          case '1':
            return "User does not exist"
            break;
          default:
            break;
        }
      });
    },

    logout: function() {
      var that = this;
      $.ajax({
        type: "POST",
        url: "/logout"
      }).done(function(){
        that.set({
          "logged": false
        });
      });
    },


    register: function(data1) {
      $.ajax({
        type: "POST",
        url: "/signup",
        data: data1
      }).done(function(data){
        //зарегать юзера, присвоить данные из модельки, при приколу зачем хз
        //в случае 403 сказать, что емайл занят уже, сорри
      });

    },

  });

  return new Model;
});
