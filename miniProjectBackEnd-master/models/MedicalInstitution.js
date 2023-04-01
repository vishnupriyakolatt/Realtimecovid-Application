const mongoose = require('mongoose');

const medicalInstitutionSchema = new mongoose.Schema({
    instituteName: { type: String, unique: true, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    contactInfo: { type: String, required: true },
    healthInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('MedicalInstitution', medicalInstitutionSchema);
