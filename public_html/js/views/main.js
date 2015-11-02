define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
) {

    return Backbone.View.extend({

        template: tmpl,
        el : 'div#main',
		name: "main",

        initialize: function() {
			this.render();
        },

        render: function() {
            this.$el.html(mainTmpl());
			this.$el.hide();
        },

        show: function() {
		  this.trigger('show',{'name' : this.name});
          this.$el.show();
          $.ajax({
                  type: "POST",
                  url: "/islogged",
                  data: null,
                  success: function(){
                     $('#logButton').html('<a class="custom_button" id="logoutButton">Log out</a>')
                     $('#logoutButton').click(function() {
                          $.ajax({
                              type: "POST",
                              url: "/logout",
                              success: function() {
								  myUser.set({ isLogged:false });
                                  $('#logButton').html('<a class="custom_button" href="#login">Log in</a>')
                              }
                          });
                     });
                  },

                  statusCode: {
                      403: function() {
						  myUser.set({ isLogged:false });
                          $('#logButton').html('<a class="custom_button" href="#login">Log in</a>')
                      }
                  }

              });
        },

        hide: function() {
          this.$el.hide();
        }

    });

});
