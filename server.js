// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();


//  Import Data
const Idea = require('./models/idea');


// IMPORT DOTENV FILES
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

// Database Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,    
});

// Database Connection Error/Success
// Define callback function for various events
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected') );
db.on('disconnected', () => console.log('mongo disconnected'));


// Middleware
// Body parser middleware: give access to req.body
app.use(express.urlencoded({ extended: true }));


// ========================================
//                  ROUTES
// ========================================

//  SEED
const seedData = require('./models/seed');
app.get('/ideas/seed',  (req, res) => {
    // First, make sure database is empty
    Idea.deleteMany({}, (error, allIdeas) => {});
    // Now make all entries to seed data
    Idea.create(seedData, (error, data) => {
        res.redirect('/ideas');
    });
});


// Index
app.get('/ideas', (req, res) => {
    Idea.find({}, (error, allIdeas) => {
        res.render('index.ejs', { ideas: allIdeas })
    });
});


// New
app.get('/ideas/new', (req, res)=> {
    res.render('new.ejs');
});


// Create
app.post('/ideas', (req, res) => {
    if (req.body.price < 0) req.body.price = 0;
    if (req.body.qty < 0) req.body.qty = 0;
    Idea.create(req.body, (error, createdIdea)=>{
        res.redirect('/ideas');
    });
});


// Show
app.get('/ideas/:id', (req, res) => {
    Idea.findById(req.params.id, (err, foundIdea) => {
        res.render(
            'show.ejs',
            {
                idea: foundIdea,
            });
    });
});

// ============================
//         LiSTENER
// ============================
app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));


