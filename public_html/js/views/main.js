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
    user: null,

    initialize: function() {
      this.user = new User();
      this.render();
      this.user.on('change', this.checkLogin);
    },

    events: {
      "click #logoutButton": "toLogout",
    },

    checkLogin: function() {
        this.user.fetch();
        this.render();
    },

    toLogout: function(){
      this.user.logout();
    },

    render: function() {
      this.$el.html(mainTmpl(this.user.toJSON()));
      this.hide();
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
