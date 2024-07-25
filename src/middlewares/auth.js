const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const token = req.headers['x-auth-token']
    console.log(token)

    if (!token) {
        return res.status(401).send("Mira a ver si se te ha olvidado iniciar sesion (login)")
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey)
        req.user = decoded
        next()
    }
    catch (err) {
        return res.status(400).send("Token invalido")
    }
}