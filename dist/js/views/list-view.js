/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';

    // Todo Item View
    // --------------

    // The DOM element for a todo item...
    app.ListView = Backbone.View.extend({
        //... is a list tag.
        tagName:  'li',

        // Cache the template function for a single item.
        template: _.template($('#item-template').html()),

        // The DOM events specific to an item.
        events: {

        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
            this.model.generateObjectid();

        },

        // Re-render the titles of the todo item.
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.toggleVisible();
            this.$inputTitle = this.$('.edit');
            this.$inputTags = this.$('#input-tags');
            this.$inputNotes = this.$('#input-notes');
            this.$inputDate = this.$('#input-date');
            this.$tasksWrapper = this.$('.tasks-wrapper');
            return this;
        },
        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function (e) {
            if (e.which === ENTER_KEY) {
                this.close();
            }
        },

        // Remove the item, destroy the model from *localStorage* and delete its view.
        clear: function () {
            this.model.destroy();
        }
    });
})(jQuery);
