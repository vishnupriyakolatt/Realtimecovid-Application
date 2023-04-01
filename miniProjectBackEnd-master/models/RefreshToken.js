const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    Token: { type: String }

})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
