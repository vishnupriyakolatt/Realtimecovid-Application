const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/User')
const ActivePatient = require('../models/ActivePatient')

const jwt = require('jsonwebtoken')
const { authenticateToken } = require('../Auth/basicAuth')
const { authUser } = require('../Auth/basicAuth')
// const { authRole } = require('../Auth/basicAuth')

const ROLE = {
    ADMIN: 'admin',
    HEALTH: 'health',
    PATIENT: 'patient',
    BASIC: 'basic'

}

// Creating one
router.post("/create", async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        role: ROLE.BASIC
    })

    try {
        await user.save()
        res.send({ status: "Account created" })
    }
    catch (err) {
        res.send({ status: "Username already taken" })

    }

})

router.post("/signin", async (req, res) => {

    const user = await User.findOne({ username: req.body.username })

    if (user == null) {
        return res.json({ status: "Could not find user" })
    }

    console.log(user)

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {

            //jwt code
            const username = req.body.username
            const userr = { name: username }

            const accessToken = jwt.sign(userr, process.env.ACCESS_TOKEN_SECRET)
            res.json({ status: "Successfull", accessToken: accessToken, username: username, userRole: user.role })


        } else {
            res.json({ status: 'Not Allowed' })
        }
    } catch {
        res.status(500).send()
    }
})
//admin manage users except patient
router.get("/fetchusers", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role === "admin") {
            User.find({ role: { $in: ["admin", "basic", "health"] }, _id: { $ne: user._id } }, 'username role', function (err, docs) {
                if (err) {
                    return res.json({ docs: null, status: "cannot fetch  users" })
                }
                console.log(docs)
                return res.json({ docs, status: " users are fetched" })
            });

        }
        else {
            res.json({ status: 'Not Allowed' })
        }

    }
    catch (error) {
        console.log(error)
    }


})
router.get("/allpatients", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role == "admin") {
            let patients = await User.find({ role: "patient" })

            if (patients) {

                patients ? res.send({ patients, status: "patients fetched" }) : null
            }
            else {
                res.send({ status: "patients not fetched" })

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
router.get("/patientsnearby", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role !== "health") {
            let patients = await ActivePatient.find({})

            if (patients) {

                patients ? res.send({ patients, status: "patients fetched" }) : null
            }
            else {
                res.send({ status: "patients not fetched" })

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
router.post("/updateusers", authenticateToken, authUser, async (req, res) => {

    try {
        let usr = await User.findOne({ username: req.user.name })
        let updatelist = req.body.updatelist
        console.log(req.body.updatelist)
        if (usr.role === "admin" && updatelist) {
            updatelist.map(async (user) => {
                await User.findOneAndUpdate({ _id: user._id },
                    { role: user.role },
                    { upsert: true, useFindAndModify: false },
                    function (err, doc) {
                        if (err) {
                            console.log(err)
                            res.json({ status: "User(s) not  updated" })
                        }

                        console.log(doc)


                    });
            })
        }
        return res.json({ status: "User(s) updated" })

    }
    catch (err) {
        return res.json({ status: "error in updating User(s) " + err })

    }



})
router.get("/basicusers", authenticateToken, authUser, async (req, res) => {
    try {
        User.find({ role: ROLE.BASIC }, 'username role', function (err, docs) {
            if (err) {
                return res.json({ status: "cannot fetch basic users" })
            }
            console.log(docs)
            return res.json({ docs, status: "basic users are fetched" })
        });

    }
    catch (error) {
        console.log(error)
    }


})
router.get("/patientusers", authenticateToken, authUser, async (req, res) => {

    let healthPerson = await User.findOne({ username: req.user.name })
    let activepatients = await ActivePatient.find({ healthInfo: { _id: healthPerson._id }, }, 'userInfo')
    let activepatientuserIds = activepatients.map((patient) => {
        return patient.userInfo._id
    })
    try {
        User.find({ _id: { $in: activepatientuserIds } }, 'username role', function (err, docs) {
            if (err) {
                return res.json({ status: "cannot fetch patient users" })
            }
            console.log(docs)
            return res.json({ docs, status: "patient users are fetched" })
        });

    }
    catch (error) {
        console.log(error)
        return res.json({ status: error })

    }



})

router.post("/sentpatients", authenticateToken, authUser, async (req, res) => {
    let healthPerson = await User.findOne({ username: req.user.name })
    if (healthPerson.role === ROLE.HEALTH) {
        let patients = req.body.addPatients
        patients.map(async (user_id) => {
            const patient = new ActivePatient({
                userInfo: { _id: user_id },
                healthInfo: { _id: healthPerson._id },
                date: Date.now()
            })
            try {
                await patient.save()
            }
            catch (err) {
                console.log(err)
                return res.json({ status: "error in updating ActivePatient" })


            }
            await User.findOneAndUpdate({ _id: user_id },
                { role: "patient" },
                { upsert: true, useFindAndModify: false },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                        return res.json({ status: "error in updating User" })

                    }
                    console.log(doc)
                });
        })
        return res.json({ status: "successfully updated ActivePatient and User" })

    }
    return res.json({ status: "Not allowed" })



})

router.post("/sentusers", authenticateToken, authUser, async (req, res) => {

    let healthPerson = await User.findOne({ username: req.user.name })

    if (healthPerson.role === ROLE.HEALTH) {

        let users = req.body.removePatients

        users.map(async (user_id) => {

            await User.findOneAndUpdate(
                { _id: user_id },
                { role: "basic" },
                { upsert: true, useFindAndModify: false },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                        return res.json({ status: "error in updating User" })

                    }
                    console.log(doc)
                });
            await ActivePatient.deleteOne({ userInfo: { _id: user_id } }, function (err) {
                if (err)
                    res.send({ status: err });

                console.log("Successful deletion");
            });
        })



        return res.json({ status: "successfully updated ActivePatient and User" })

    }
    return res.json({ status: "Not allowed" })




})
module.exports = router
