const express = require('express');
const ideasRouter = express.Router();
const Idea = require('../models/idea');

//  SEED
const seedData = require('../models/seed');
ideasRouter.get('/seed',  (req, res) => {
    // First, make sure database is empty
    Idea.deleteMany({}, (error, allIdeas) => {});
    // Now make all entries to seed data
    Idea.create(seedData, (error, data) => {
        res.redirect('/ideas');
    });
});


// Index
ideasRouter.get('/', (req, res) => {
    Idea.find({}, (error, allIdeas) => {
        res.render('index.ejs', { ideas: allIdeas })
    });
});


// New
ideasRouter.get('/new', (req, res)=> {
    res.render('new.ejs');
});


// Delete
ideasRouter.delete('/:id', (req, res) => {
    Idea.findByIdAndDelete(req.params.id, (error, foundIdea) => {
        res.redirect('/ideas');
    });
});


// BUY
ideasRouter.put('/:id/buy', (req, res) => {
    Idea.findById(req.params.id, (error, foundIdea) => {
        foundIdea.qty -= 1;
        foundIdea.save();
        res.render('show.ejs',
        {
            idea: foundIdea,
        });
    });
});


// Update
ideasRouter.put('/:id', (req, res) => {
    Idea.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedIdea) => {
        res.redirect(`/ideas/${req.params.id}`);
    });
});


// Create
ideasRouter.post('/', (req, res) => {
    if (req.body.price < 0) req.body.price = 0;
    if (req.body.qty < 0) req.body.qty = 0;
    Idea.create(req.body, (error, createdIdea)=>{
        res.redirect('/ideas');
    });
});


// Edit
ideasRouter.get('/:id/edit', (req, res) => {
    Idea.findById(req.params.id, (error, foundIdea) => {
        res.render('edit.ejs',{ idea: foundIdea});
    });
});


// Show
ideasRouter.get('/:id', (req, res) => {
    Idea.findById(req.params.id, (err, foundIdea) => {
        res.render(
            'show.ejs',
            {
                idea: foundIdea,
            });
    });
});





module.exports = ideasRouter;