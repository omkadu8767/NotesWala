const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



// Route:1 Get all the notes of a user using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error ");
    }
})

// Route:2 Add note of a user using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    // adding validators
    body('title', 'Enter a valid tile').isLength({ min: 3 }),
    body('description', 'Enter a valid description of min 5 char').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;  // destructuring the body of the request

        //if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server Error ");
    }

})

// Route:3 Update an existing note of a user using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;     // destructuring the body of the request
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // Allow updation only if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server Error ");
    }

});

// Route:4 Deleting a note of a user using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // Allow deletion only if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server Error ");
    }
});

module.exports = router;