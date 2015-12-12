define([
  'backbone',
  'tmpl/main'
], function(
  Backbone,
  tmpl
) {

  return Backbone.View.extend({

    template: tmpl,
    el: 'div#main',
    name: "main",
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
      this.model.on('change', this.checkLogin.bind(that));
    },

    toGame: function() {
      this.backbone.history.navigate('#game', {
        trigger: true,
        replace: true
      });
    },

    toScoreboard: function() {
      this.backbone.history.navigate('#score', {
        trigger: true,
        replace: true
      });
    },

    toLogout: function() {
      this.model.logout();
    },

    toLogin: function() {
      this.model.login();
    },

    checkLogin: function() {
      this.model.fetch();
      this.render();
    },

    block: function() {
      alert("BLOCKED");
      $("#overlay").addClass('overlay');
    },

    unblock: function() {
      alert("UNBLOCKED");
      $("#overlay").removeClass('overlay');
    },

    render: function() {
      this.$el.html(mainTmpl(this.model.toJSON()));
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
