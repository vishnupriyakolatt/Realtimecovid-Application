const jwt = require('jsonwebtoken');

var authUser = function (req, res, next) {
    if (req.user == null) {
        res.status(403)
        return res.json({ status: "You need to sign in" })
    }

    next()
}

async function authRole(role) {

    return async (req, res, next) => {
        let userr = await User.findOne({ username: req.user.name }).select('role')
        req.user.role = userr.role
        if (req.user.role !== role) {
            res.status(401)
            return res.json({ status: "Not allowed" })
        }

        next()
    }
}

var authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        console.log("inside authenticatetoken")
        console.log(req.user)

        next()
    })
    token = null
}

module.exports = {
    authUser,
    authRole,
    authenticateToken
}