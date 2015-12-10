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
    backbone: Backbone,

    events: {
      "click #logout": "toLogout",
      "click #login": 'toLogin',
      "click #game": 'toGame',
      "click #scoreboard": 'toScoreboard'
    },

    initialize: function() {
      var that = this;
      alert("INITIALIZATION WHAT THE FUCK");
      this.render();
      this.user.on('change', this.checkLogin.bind(that));
    },

    toGame: function(){
      this.backbone.history.navigate('#game', {trigger: true, replace: true});
    },

    toScoreboard: function(){
      this.backbone.history.navigate('#score', {trigger: true, replace: true});
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
