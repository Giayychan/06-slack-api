// Require
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Model
module.exports = mongoose.model('messages', {
	channel: {
		type: ObjectId,
		ref: 'channels',
		required: true
	},
	user: {
		type: ObjectId,
		ref: 'users',
		required: true
	},
	text: {
		type: String,
		required: true
	},
	file: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
})
