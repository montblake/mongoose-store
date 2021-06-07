const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;

require('dotenv').config();

//=========================
//         Port
//=========================
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;


//=========================
//         Database
//=========================
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(
    MONGODB_URI, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);


// Error / Success comminication
db.on('error', (err) => console.log(err.message + ' is mongodb not running?'));
db.on('connected', () => console.log('mongodb connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongodb disconnected '));

// ======================
//        Middleware
// ======================
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));


// ========================
//        Routes
// ========================
// localhost:3000
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to the Montblake Store...?');
});


// ========================
//        Listener
// ========================
app.listen(PORT, () => console.log('express is listening on port ', PORT));