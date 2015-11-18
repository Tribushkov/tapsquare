define([
  'backbone',
  'tmpl/scoreboard'
], function(
  Backbone,
  tmpl
) {

  return Backbone.View.extend({

    template: tmpl,
    el: 'div#scoreboard',
    name: "scoreboard",

    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html(scoreboardTmpl());
      this.$el.hide();
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
