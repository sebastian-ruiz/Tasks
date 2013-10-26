/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false,
            selected: false,
            objectid: ''
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		},

        generateObjectid: function(){
            if(this.get("objectid") == ''){
                var generatedObjectid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
                console.log("Generated id: " + generatedObjectid);
                this.save({
                    objectid: generatedObjectid
                });
            }else {
                console.log("already: " + this.get("objectid"));
            }
        },
        setSelected: function() {
            if(this.get('selected') == true){
                this.save({
                    selected: false
                });
            }else {
                this.collection.deselectLastSelected();
                this.save({
                    selected: true
                });
            }

        }

	});
})();
