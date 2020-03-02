// Require
const Channels = require('../models/channels')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Routes
router.post('/', (req, res) => {
	let token = req.headers.authorization.split(' ')[1]
	let data = jwt.verify(token, process.env.SECRET)
	if (data) {
		Channels.create(req.body)
			.then(channel => {
				res.send(channel)
			})
			.catch(err => res.send(err))
	} else {
		res.send({ error: 'not authorized' })
	}
})
router.get('/', (req, res) => {
	let token = req.headers.authorization.split(' ')[1]
	let data = jwt.verify(token, process.env.SECRET)
	if (data) {
		Channels.find(req.query)
			.then(channels => {
				res.send(channels)
			})
			.catch(err => res.send(err))
	} else {
		res.send({ error: 'not authorized' })
	}
})

// Export
module.exports = router
