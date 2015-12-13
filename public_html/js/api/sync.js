define([
    'backbone'
  ],
  function(
    Backbone
  ) {

    Backbone.sync = function(method, model, options) {

      var url = model.url;
      switch (method) {

        case "create":
          var data = model.toJSON();
          console.log("CREATE");
          $.ajax({
            type: "POST",
            url: url['create'],
            data: data
          }).done(function(obj, xhr, status) {
            if (JSON.parse(status["status"]) == 200) {
              options.success(model);
            }
          });
          break;

        case "read":
          console.log("READ");
          $.ajax({
            type: "GET",
            url: url['read']
          }).done(function(obj, xhr, status) {
            if (JSON.parse(status["status"]) == 200) {
              options.success(model);
            }
          });
          break;

        case "update":
          console.log("UPDATE");
          var data = model.toJSON();
          $.ajax({
            type: "PUT",
            url: url['update'],
            data: data
          }).done(function(obj, xhr, status) {
            if (JSON.parse(status["status"]) == 200) {
              options.success(model);
            }
          });
          break;

        case "delete":
          console.log("DELETE");
          $.ajax({
            type: "DELETE",
            url: url['delete']
          }).done(function(obj, xhr, status) {
            if (JSON.parse(status["status"]) == 200) {
              options.success(model);
            }
          });

        default:
          break;
      }
    };
  });
