const express = require('express');
const router = express.Router()
const CountryData = require('../models/CountryData')
const { authenticateToken } = require('../Auth/basicAuth')
const { authUser } = require('../Auth/basicAuth')



// fetching countries
router.get("/fetchCountries", authenticateToken, authUser, async (req, res) => {

    let countries = await CountryData.find({})
    res.send(countries)

})
module.exports = router
