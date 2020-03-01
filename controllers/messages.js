// Require
const Messages = require('../models/messages')
const router = require('express').Router()

// Routes
router.post('/', (req, res) => {
	Messages.create(req.body)
		.then(message => {
			res.send({ date: message.date })
		})
		.catch(err => res.send(err))
})

router.get('/', (req, res) => {
	Messages.find(req.query)
		.then(messages => {
			res.send(messages)
		})
		.catch(err => res.send(err))
})

// Export
module.exports = router
