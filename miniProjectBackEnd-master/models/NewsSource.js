const mongoose = require('mongoose');

const newsSourceSchema = new mongoose.Schema({
    sourceName: { type: String, required: true },
    sourceLink: { type: String, required: true, unique: true },
    selectr: { type: String, default: null },
    specific: { type: String, default: null },
    scrappable: { type: Boolean, default: true }

})

module.exports = mongoose.model('NewsSource', newsSourceSchema);
