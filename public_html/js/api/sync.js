define([
    'backbone'
  ],
  function(
    Backbone
  ) {

    Backbone.sync = function(method, model, options) {
      switch (method) {

        case "create":
          var data = model.toJSON();
          $.ajax({
            type: "POST",
            url: url,
            data: data
          }).done(function(obj) {

          });
          break;

        case "read":
          $.ajax({
            type: "GET",
            url: url
          }).done(function(obj) {

          });
          break;

        case "update":
          var data = model.toJSON();
          $.ajax({
            type: "PUT",
            url: url,
            data: data
          }).done(function(obj) {});
          break;

        case "delete":
          $.ajax({
            type: "DELETE",
            url: url
          }).done(function(obj) {});
          break;
          
        default:
          break;
      }
    };
  });
