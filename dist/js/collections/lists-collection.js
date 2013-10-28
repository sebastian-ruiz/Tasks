/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    // Lists Collection
    // ---------------

    // The collection of todos is backed by *localStorage* instead of a remote
    // server.
    var Lists = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: app.List,

        localStorage: new Backbone.LocalStorage('lists-backbone'),
    });

    // Create our global collection of **Lists**.
    app.lists = new Lists();
})();
