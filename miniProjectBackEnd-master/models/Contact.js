const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    ContactName: { type: String, unique: true },
    ContactNumber: { type: String }

})

module.exports = mongoose.model('Contact', contactSchema);
