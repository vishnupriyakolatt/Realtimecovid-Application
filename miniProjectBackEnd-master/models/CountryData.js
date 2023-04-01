const mongoose = require('mongoose');

const CountryDataSchema = new mongoose.Schema({
    Country: { type: String, required: true },
    Slug: { type: String, required: true },
    ISO2: { type: String, default: null, unique: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }

})

module.exports = mongoose.model('countrydata', CountryDataSchema);
