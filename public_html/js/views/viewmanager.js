define(['backbone'], function(Backbone){

    var View = Backbone.View.extend({

		views: [],

		initialize: function () {
		},

		getViews: function(){
			return this.views;
		},

		hideViews: function(data){
			_.each(manager.getViews(), function(item){
				if (item.name != data.name){
					item.hide();
				}
			});
		},

		add: function(view){
			this.views.push(view);
			view.on('show', this.hideViews);
		}

    });

    return View;
});
