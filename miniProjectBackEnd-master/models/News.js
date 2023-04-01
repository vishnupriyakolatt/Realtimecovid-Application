const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String },
    link: { type: String, unique: true },
    imglink: { type: String },
    source: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewsSource'
    },
    showable: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }


})

module.exports = mongoose.model('News', newsSchema);
