/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Todo Item View
	// --------------

	// The DOM element for a todo item...
	app.TodoView = Backbone.View.extend({
		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single item.
		template: _.template($('#item-template').html()),

		// The DOM events specific to an item.
		events: {
			'click .toggle': 'toggleCompleted',
            'click .tasks-wrapper': 'newSelected',
            //'blur .tasks-wrapper': 'deselect',
            'dblclick .tasks-wrapper': 'edit',
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close',
            'keypress #input-tags': 'updateOnEnter',
            'blur #input-tags': 'closeTags',
            'keypress #input-notes': 'updateOnEnter',
            'blur #input-notes': 'closeNotes',
            'keypress #input-date': 'updateOnEnter',
            'blur #input-date': 'closeDate'

		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
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

		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());
		},

		isHidden: function () {
			var isCompleted = this.model.get('completed');
			return (// hidden cases only
				(!isCompleted && app.TodoFilter === 'completed') ||
				(isCompleted && app.TodoFilter === 'active')
			);
		},
		// Toggle the `"completed"` state of the model.
		toggleCompleted: function () {
			this.model.toggle();
		},
        newSelected: function () {
            $(".tasks-wrapper").removeClass("selected-item");
            this.$tasksWrapper.addClass('selected-item');
        },
		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function () {
			this.$el.addClass('editing');
			this.$inputTitle.focus();
		},

		// Close the `"editing"` mode, saving changes to the todo.
		close: function () {
            console.log("blur close");
			var trimmedValue = this.$inputTitle.val().trim();
			this.$inputTitle.val(trimmedValue);

			if (trimmedValue) {
				this.model.save({ title: trimmedValue });
			} else {
				//this.clear();
			}
            //this.$tasksWrapper.removeClass('selected-item');
			//this.$el.removeClass('editing');
		},
        closeTags: function() {
            var trimmedValue = this.$inputTags.val().trim();
            this.$inputTags.val(trimmedValue);

            if (trimmedValue) {
                this.model.save({ tags: trimmedValue });
            }
        },
        closeNotes: function() {
            var trimmedValue = this.$inputNotes.val().trim();
            this.$inputNotes.val(trimmedValue);

            if (trimmedValue) {
                this.model.save({ notes: trimmedValue });
            }
        },
        closeDate:function() {
            var trimmedValue = this.$inputDate.val().trim();
            this.$inputDate.val(trimmedValue);

            if (trimmedValue) {
                this.model.save({ dateDue: trimmedValue });
            }
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
