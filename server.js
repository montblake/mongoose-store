// DEPENDENCIES
const express = require('express');
const app = express();
const methodOverride = require('method-override');
require('dotenv').config();


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
app.use(express.static('public'));
app.use(methodOverride('_method'));

// ========================================
//                  ROUTES
// ========================================
const ideasController = require('./controllers/ideas')
app.use('/ideas', ideasController);


// ============================
//         LiSTENER
// ============================
app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));


