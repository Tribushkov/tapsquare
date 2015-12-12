define([
  'backbone',
  'models/score'
], function(
  Backbone,
  Score
) {

  var Collection = Backbone.Collection.extend({
    model: Score,
    url: 'score'
  });

  return new Collection();
});
