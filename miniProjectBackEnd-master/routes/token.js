const express = require('express');
const router = express.Router()
const { authenticateToken } = require('../Auth/basicAuth')
const User = require('../models/User')
// const { authUser } = require('../Auth/basicAuth')

router.get("/verify", authenticateToken, async (req, res) => {
    if (req.user == null) {
        res.status(403)
        return res.json({ status: "You need to sign in", action: false })
    }
    const userr = await User.findOne({ username: req.user.name })

    return res.json({ status: "token is active", action: true, username: userr.username, userRole: userr.role })

})


module.exports = router
