require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define([
    'backbone',
    'router',
	'models/user'
], function(
    Backbone,
    router,
	User
) {
	myUser = new User();
	
	$.ajax({
		type: "POST",
		url: "/islogged",
		data: null,
		success: function() {
			myUser.set({ isLogged:true });
		},
	});

    Backbone.history.start();
});
