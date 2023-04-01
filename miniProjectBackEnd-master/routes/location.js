const express = require('express');
const router = express.Router()
const ActivePatient = require('../models/ActivePatient')
const User = require('../models/User')

const { authenticateToken } = require('../Auth/basicAuth')
const { authUser } = require('../Auth/basicAuth')

// location routes
router.post("/poll", authenticateToken, authUser, async (req, res) => {

    // const activepatient = new ActivePatient({
    //     userInfo: "606fec8c0f199d204a5ba6fe",
    //     healthInfo: "606fec57b12d4c203983bf9c",
    // })

    // try {
    //     await activepatient.save()
    //     res.send({ status: "patient created" })
    // }
    // catch (err) {
    //     res.send({ status: "patient already taken" })

    // }


    let userr = await User.findOne({ username: req.user.name })
    console.log(req.body.latitude, req.body.longitude)
    console.log(req.user.name)
    console.log(userr._id)

    await ActivePatient.findOneAndUpdate({ userInfo: { _id: userr._id } },
        { latitude: req.body.latitude, longitude: req.body.longitude, date: Date.now() },
        { upsert: true, useFindAndModify: false },
        function (err, doc) {
            if (err) return res.send(500, { status: err });
            console.log(doc)
            return res.send({ status: doc });
        });



})
module.exports = router
