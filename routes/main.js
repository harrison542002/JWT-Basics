const express = require('express')
const routes = express.Router()
const { login, dashboard } = require('../controllers/main')
const authorizationMiddleware = require('../middleware/auth')

routes.route('/dashboard').get(authorizationMiddleware, dashboard)
routes.route('/login').post(login)


module.exports = routes