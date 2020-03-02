// Require
const Messages = require('../models/messages')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Routes
router.post('/', (req, res) => {
	let token = req.headers.authorization.split(' ')[1]
	let data = jwt.verify(token, process.env.SECRET)
	if (data) {
		req.body.user = data._id
		Messages.create(req.body)
			.then(message => {
				res.send(message)
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
		Messages.find(req.query)
			.populate('user')
			.then(messages => {
				res.send(messages)
			})
			.catch(err => res.send(err))
	}
})

// Export
module.exports = router
