const jwt = require('jsonwebtoken')
const {Unauthorized} = require('../errors')

const authorizationMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
        throw new Unauthorized('No token provied')
    }
    const token = auth.split(' ')[1]
    try {
        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decode
        req.user = { id, username }
        next()
    } catch (error) {
        throw new Unauthorized('Not authorized to access this route')
    }

}

module.exports = authorizationMiddleware