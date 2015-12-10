define([
  'backbone'
], function(
  Backbone
) {

  var views = [];

  var View = Backbone.View.extend({

    add: function(currentView) {
      views.push(currentView);
      this.listenTo(currentView, "show", function() {
        views.forEach(function(view) {
          if (view != currentView)
            view.hide();
        });
      });
    }

  });
  return View;
});
