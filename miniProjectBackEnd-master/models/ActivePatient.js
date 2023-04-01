const mongoose = require('mongoose');

const activePatientSchema = new mongoose.Schema({
    latitude: { type: Number },
    longitude: { type: Number },
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    healthInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: { type: Date }


})

module.exports = mongoose.model('ActivePatient', activePatientSchema);
