const express = require('express');
const router = express.Router()
// const geolib = require('geolib');

const { authenticateToken, authUser } = require('../Auth/basicAuth')
const User = require('../models/User')

const MedicalInstitution = require('../models/MedicalInstitution')


router.post("/createInstitution", authenticateToken, authUser, async (req, res) => {
    try {

        let user = await User.findOne({ username: req.user.name })
        console.log(user.role)
        if (user.role === "health") {

            const institution = new MedicalInstitution({
                instituteName: req.body.instituteName,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                contactInfo: req.body.contactInfo,
                healthInfo: user._id
            })

            try {
                await institution.save()
                res.send({ status: "institution created" })
            }
            catch (err) {
                res.send({ status: "institution not created " + err })

            }


        }
        else {
            return res.json({ status: "Not allowed" })
        }
    }
    catch (err) {
        console.log(err)
        return res.json({ status: "error occured," + err })

    }



})
router.get("/fetchInstitutionsbyHealth", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role === "health") {
            let institutions = await MedicalInstitution.find({})
            if (institutions) {
                res.send({ institutions, status: "institutions fetched" })
            }
            else {
                res.send({ status: "institutions not fetched" })

            }
        }
        else {
            return res.json({ status: "Not allowed" })
        }

    }
    catch (err) {
        console.log(err)
        return res.json({ status: "error occured," + err })
    }


})
//fetchNearby
router.get("/fetchInstitutionsNearby", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user) {
            let institutions = await MedicalInstitution.find({})


            if (institutions) {

                institutions ? res.send({ institutions, status: "institutions fetched" }) : null
            }
            else {
                res.send({ status: "institutions not fetched" })

            }
        }
        else {
            return res.json({ status: "Not allowed" })
        }

    }
    catch (err) {
        console.log(err)
        return res.json({ status: "error occured," + err })
    }


})
//this route is not implemented
router.post("/updateInstitutions", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role === "health") {

            await MedicalInstitution.findOneAndUpdate({ _id: req.body._id },
                {
                    instituteName: req.body.instituteName,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    contactInfo: req.body.contactInfo
                },
                {
                    upsert: true,
                    useFindAndModify: false
                },
                function (err, doc) {
                    if (err) return res.json({ status: "institution not updated " + err });
                    console.log(doc)
                    return res.json({ status: "institution updated" });
                });

        }
        else {
            return res.json({ status: "Not allowed" })
        }
    }
    catch (err) {
        console.log(err)
        return res.json({ status: "error occured," + err })

    }



})
router.post("/deleteInstitutions", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role === "health") {
            let _ids = req.body.removeinstitutions
            await MedicalInstitution.deleteMany({ _id: { $in: _ids } }, function (err, docs) {
                if (err)
                    res.send({ status: "institution(s) not deleted" + err });
                res.send({ docs, status: "institution(s) Successfully deleted" });
            });


        }
        else {
            return res.json({ status: "Not allowed" })
        }
    }
    catch (err) {
        console.log(err)
        return res.json({ status: "error occured," + err })

    }



})

module.exports = router
