// Require
const Messages = require('../models/messages')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const DataUri = require('datauri')
const path = require('path')
const cloudinary = require('cloudinary')
const dataUri = new DataUri()

// Routes
router.post('/', upload.single('file'), (req, res) => {
	let token = req.headers.authorization.split(' ')[1]
	let data = jwt.verify(token, process.env.SECRET)
	if (data) {
		req.body.user = data._id
		let uri = dataUri.format(
			path.extname(req.file.originalname).toString(),
			req.file.buffer
		).content
		cloudinary.uploader.upload(uri).then((result, err) => {
			console.log(result, err)
			req.body.file = result.url
			Messages.create(req.body)
				.then((message) => {
					res.send(message)
				})
				.catch((err) => res.send(err))
		})
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
			.then((messages) => {
				res.send(messages)
			})
			.catch((err) => res.send(err))
	}
})

// Export
module.exports = router
