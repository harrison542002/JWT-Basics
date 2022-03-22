const { BadRequest } = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new BadRequest('Please provide username and password')
    }

    //Just Mandance Approach, usually get from db
    const id = new Date().getDate()

    //Note : Never push password in payload for good practice
    //setup sign token
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30 days' })
    res.status(200).json({ msg: 'Login Successful!', token })
}

const dashboard = async (req, res) => {
    const lucky = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello ${req.user.username}`, secret: `Your lucky number is ${lucky}` })
}

module.exports = { login, dashboard }