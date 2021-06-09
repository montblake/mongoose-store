const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    qty: { type: Number, required: true }
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;