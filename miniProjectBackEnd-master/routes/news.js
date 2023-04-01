const express = require('express');
const router = express.Router()
const News = require('../models/News')
const NewsSource = require('../models/NewsSource')
const User = require('../models/User')

const { authenticateToken } = require('../Auth/basicAuth')
const { authUser } = require('../Auth/basicAuth')



// Creating news source
router.post("/createSource", authenticateToken, authUser, async (req, res) => {
    try {

        let user = await User.findOne({ username: req.user.name })
        console.log(user.role)
        if (user.role === "admin") {

            const newsSource = new NewsSource({
                sourceName: req.body.sourceName,
                sourceLink: req.body.sourceLink
            })

            try {
                await newsSource.save()
                res.send({ status: "news source created" })
            }
            catch (err) {
                res.send({ status: "news source not created " + err })

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
// fetching news
router.get("/fetchNews", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role) {
            let news = await News.find({ showable: true }).sort({ date: -1 })
            if (news) {
                res.send({ news, status: "news fetched" })
            }
            else {
                res.send({ status: "news not fetched" })

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
router.get("/fetchSource", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role === "admin") {
            let sources = await NewsSource.find({})
            if (sources) {
                res.send({ sources, status: "news sources fetched" })
            }
            else {
                res.send({ status: "news sources not fetched" })

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
router.post("/removeSource", authenticateToken, authUser, async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.name })
        if (user.role === "admin") {
            let _ids = req.body.removesources
            await NewsSource.deleteMany({ _id: { $in: _ids } }, function (err, docs) {
                if (err)
                    res.send({ status: "source(s) not deleted" + err });
                res.send({ docs, status: "source(s) Successfully deleted" });
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
