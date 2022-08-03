const express = require('express');
const cors = require('cors');
let app = express();
app.use(cors({origin: 'http://localhost:3000'}));
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const {body, validationResult} = require('express-validator');
const router = express.Router();
// route 1: get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal error");
    }
});
// route 2: add notes
router.post('/addnotes', fetchuser, [
        body('title', "Enter Title of min length 3").isLength({min: 3}),
        body('description', "Enter Description of min 5 and max 100").isLength({min: 5, max: 100})
    ],
    async (req, res) => {
        try {
            // Check if User enter notes correcty or not
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            // destruct the object
            const {title, description, tag} = req.body;
            // save note with user id which is _id(given by mongo) to user in users collection
            const note = new Notes({
                title, description, tag, user: req.user.id
            });
            let resObj = await note.save()
            res.status(200).send(resObj);
        } catch (e) {
            res.status(500).send("Internal error due to " + e);
        }
    });

// route 3: update notes
router.put('/updatenote/:id', [
        body('title', "Enter Title of min length 3").isLength({min: 3}),
        body('description', "Enter Description of min 5 and max 100").isLength({min: 5, max: 100})
    ], fetchuser,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            // create a new notes object
            let newNote = {};
            if (req.body.title) {
                newNote.title = req.body.title;
            }
            if (req.body.description) {
                newNote.description = req.body.description;
            }
            if (req.body.tag) {
                newNote.tag = req.body.tag;
            }
            // find note
            let findNote = await Notes.findById(req.params.id);
            if (!findNote) {
                return res.status(404).send("Not Found");
            }
            if (findNote.user.toString() !== req.user.id) {
                return res.status(404).send("Not allowed");
            }
            // Valid user update the note
            findNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
            res.status(200).json(findNote);
        } catch (e) {
            res.status(500).send("Internal error");
        }
    });


// route 4: delete notes
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
        try {
            // find note
            let findNote = await Notes.findById(req.params.id);
            // if note with id is not found
            if (!findNote) {
                return res.status(404).send("Not Found");
            }
            // check the person who delete the note belong to the same person whose node is this
            if (findNote.user.toString() !== req.user.id) {
                return res.status(404).send("Not allowed");
            }
            // Valid user delete the note
            findNote = await Notes.findByIdAndDelete(req.params.id);
            res.status(200).json({delete: findNote});
        } catch (e) {
            console.log(e);
            res.status(500).send("Internal error");
        }
    });

module.exports = router;