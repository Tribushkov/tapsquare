define([
  'backbone'
], function(
  Backbone
) {

  var View = Backbone.View.extend({

    views: [],
    getViews: function() {
      return this.views;
    },

    hideViews: function(data) {
      var that = this;
      _.each(that.views, function(item) {
        if (item.name != data.name) {
          item.hide();
        }
      });
    },

    add: function(view) {
      var that = this;
      this.views.push(view);
      view.on('show', that.hideViews.bind(this, this.views));
    }
    
  });
  return new View;
});
