define([
    'backbone'
], function(
    Backbone
){
    var Model = Backbone.Model.extend({

    backbone: Backbone,

    initialize: function() {
      this.set({'logged' : false});
		},

    isLogged: function(){
        return !!this.get("logged");
    },

    fetch: function() {
      var that = this;
      $.ajax({
              type: "POST",
              url: "/islogged",
              data: null,
              success: function(){
                that.set({logged: true});
              },
              statusCode: {
                  403: function() {
                    that.set({ logged:false });
                  }
              }
          });
    },

    login: function(data1) {
      var that = this;
			$.ajax({
				type: "POST",
				url: "/signin",
				data: data1,
				success: function() {
					that.set({ logged:true });
				},
				statusCode: {
					403: function(data) {
						switch (data.getResponseHeader('Error')) {
							case '0':
							$("#idForm").toggleClass('animated shake');
							$("#passwordControl").html('<label class="control-label" for="password1" id="passwordLog">Incorrect password</label>')
							$("#passwordGroup").addClass("has-error");
								break;
							case '1':
							$("#idForm").toggleClass('animated shake');
							$("#loginControl").html('<label class="control-label" for="login1" id="passwordLog">User does not exist</label>')
							$("#loginGroup1").addClass("has-error");
								break;
							default:
								break;
						}
					}
				},
			})
		},


		register: function(data1) {
			$.ajax({
					type: "POST",
					url: "/signup",
					data: data1,
					success: function(data) {
					},
					statusCode: {
						403: function(data) {
						$("#emailNotification").html('<label class="control-label" for="password1" id="passwordLog">Sorry, this email is already engaged</label>')
						$("#emailGroup").addClass("has-error");
					}
				}
			});
		},

    });

    return new Model;
});
