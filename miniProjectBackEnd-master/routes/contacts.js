const express = require('express');
const router = express.Router()
const Contacts = require('../models/Contact')
const { authenticateToken, authUser } = require('../Auth/basicAuth')
const User = require('../models/User')


router.post("/createcontact", authenticateToken, authUser, async (req, res) => {
    try {

        let user = await User.findOne({ username: req.user.name })
        console.log(user.role)
        if (user.role === "admin") {

            const contact = new Contacts({
                ContactName: req.body.contactName,
                ContactNumber: req.body.contactNumber
            })

            try {
                await contact.save()
                res.send({ status: "contact created" })
            }
            catch (err) {
                res.send({ status: "contact not created " + err })

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

router.get("/fetchcontacts", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role) {
            let contacts = await Contacts.find({})
            if (contacts) {
                res.send({ contacts, status: "contacts fetched" })
            }
            else {
                res.send({ status: "contacts not fetched" })

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

router.post("/removecontact", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role === "admin") {
            let _ids = req.body.removecontacts
            await Contacts.deleteMany({ _id: { $in: _ids } }, function (err, docs) {
                if (err)
                    res.send({ status: "contact(s) not deleted" + err });
                res.send({ docs, status: "contact(s) Successfully deleted" });
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
