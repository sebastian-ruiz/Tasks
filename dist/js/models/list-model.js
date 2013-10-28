/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    // List Model
    // ----------

    app.List = Backbone.Model.extend({

        defaults: {
            title: '',
            objectid: ''
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
        }

    });
})();
