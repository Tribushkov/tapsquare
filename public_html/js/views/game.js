define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    return Backbone.View.extend({

        template: tmpl,
        el: 'div#game',
        initialize: function () {
            // TODO
        },
        render: function () {
            this.$el.html(gameTmpl());

            $(".game-cell").click(function() {
                if ($(this).attr('class') == 'game-cell')
                    $(this).addClass('hover');
                else
                    $(this).removeClass('hover');
            });
        },
        show: function () {
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

});
