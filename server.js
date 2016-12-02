/**
 * Created by rhnorment on 12/2/16.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var mongodb = require('mongodb');
var ObjectID = mongod.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Create a database variable outside of the database connection callback to reuse the connection pool
var db;

// Connect to the database before starting the application server
mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse
    db = database;
    console.log("Database connection ready");

    // Initialize the app
    var server = app.listen(process.env.PORT || 8080, function() {
       var port = server.address().port;
       console.log("App is now running on port", port);
    });
});


// CONTACTS API ROUTES BELOW

module.exports = app;
