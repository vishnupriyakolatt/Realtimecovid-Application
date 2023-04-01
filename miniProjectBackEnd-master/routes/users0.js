const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/User')

//accessing refresh token
const RefreshTokens = require('../models/RefreshToken')

const jwt = require('jsonwebtoken')
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
        return res.send({ status: "Could not find user" })
    }
    console.log(user)
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {

            //jwt code
            const username = req.body.username
            const user = { name: username }

            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

            //saving refresh token to database
            const token = new RefreshTokens({
                Token: refreshToken
            })
            await token.save().then(() => {
                console.log(`Access: ${accessToken} refresh: ${refreshToken}`);
                res.json({ status: "Successfull", accessToken: accessToken, refreshToken: refreshToken })
            })

        } else {
            res.send({ status: 'Not Allowed' })
        }
    } catch {
        res.status(500).send()
    }
})


router.post('/token', async (req, res) => {
    const refreshToken = req.body.token

    if (refreshToken == null) return res.sendStatus(401)

    if (await !RefreshTokens.findOne({ Token: refreshToken })) //return res.sendStatus(403)
        return res.send("here")
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) //return res.sendStatus(403)
            return res.send("there")

        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

router.delete('/logout', async (req, res) => {
    await RefreshTokens.deleteMany({ Token: req.body.token }, function (err) {
        if (err) console.log(err);
        console.log(" deleted token");
        res.sendStatus(204);

    });

})
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
module.exports = router
