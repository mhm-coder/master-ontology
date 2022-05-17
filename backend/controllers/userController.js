const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const {userModel} = require("../models");

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email})

    if (user && await bcrypt.compare(password, user.password)) {
        console.log('user.id: ', user.id)
        console.log('user._id: ', user._id)
        const {id: _id, name, email} = user
        res.status(201).json({_id, name, email, token: generateToken(user._id)})
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await userModel.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({name, email, password: hashedPassword})

    if (user) {
        const {id: _id, name, email} = user

        res.status(201).json({_id, name, email, token: generateToken(user._id)})
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json('Get Current User')
})

const generateToken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})

module.exports = {registerUser, loginUser, getCurrentUser}