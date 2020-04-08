// Require
const Users = require('../models/users')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Routes
router.post('/signup', (req, res) => {
	Users.findOne({ email: req.body.email })
		.then((user) => {
			if (user) {
				res.send({ error: 'Email already exists' })
			} else {
				let encrypted = bcrypt.hashSync(req.body.password, 10)
				req.body.password = encrypted
				Users.create(req.body)
					.then((data) => {
						let token = jwt.sign(data.toObject(), process.env.SECRET)
						res.send(token)
					})
					.catch((err) => {
						res.send(err)
					})
			}
		})
		.catch((err) => {
			res.send(err)
		})
})

router.post('/login', (req, res) => {
	Users.findOne({ email: req.body.email })
		.then((user) => {
			if (user) {
				let match = bcrypt.compareSync(req.body.password, user.password)
				if (match) {
					let token = jwt.sign(user.toObject(), process.env.SECRET)
					res.send(token)
				} else {
					res.send({ error: 'email not found or incorrect password' })
				}
			} else {
				res.send({ error: 'email not found' })
			}
		})
		.catch((err) => {
			res.send(err)
		})
})

// Export
module.exports = router
