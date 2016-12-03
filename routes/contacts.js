/**
 * Created by rhnorment on 12/3/16.
 */
var express = require('express');
var router = express.Router();

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints
function handleError(res, reason, message, code) {
    console.log("ERROR" + reason);
    res.status(code || 500).json({"error": message});
}

/* "/contacts"
 *     GET: finds all contacts
 *     POST: creates a new contact
 */

router.get("/contacts", function(req, res) {
    db.collection(CONTACTS_COLLECTION).find(
        {}
    ).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
});

router.post("/contacts", function(req, res) {
    var newContact = req.body;
    newContact.createDate = new Date();

    if (!(req.body.firstName || req.body.lastName)) {
        handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
    }

    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/* "contacts/:id"
 *     GET: find contact by id
 *     PUT: update contact by id
 *     DELETE: deletes contact by id
 */

router.get("/contacts/:id", function(req, res) {
    db.collection(CONTACTS_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get contact.");
        } else {
            res.status(200).json(doc);
        }
    });
});

router.put("/contacts/:id", function(req, res) {

});

router.delete("/contacts/:id", function(req, res) {

});

module.exports = router;

