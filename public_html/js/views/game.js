define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    return Backbone.View.extend({

        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
            $('#page').html(gameTmpl());
            $(".game-cell").click(function() {
                if ($(this).attr('class') == 'game-cell')
                    $(this).addClass('hover');
                else 
                    $(this).removeClass('hover');
            });
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        }

    });

});