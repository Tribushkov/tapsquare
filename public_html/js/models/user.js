define([
    'backbone'
], function(
    Backbone
){
    var Model = Backbone.Model.extend({

		defaults: {
			isLogged : false
		},

        initialize: function() {

		}
    });

    return Model;
});
