const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String, required: true, unique: true },
	mobileNumber: { type: String },
	address: { type: String },
	genero: { type: String },
	avatar: { type: String },

	isAdmin: { type: Boolean, default: false }
})

userSchema.methods.generateJWT = function () {
	return jwt.sign(
		{ username: this.username, isAdmin: this.isAdmin },
        process.env.jwtPrivateKey	)
}
const User = mongoose.model('User', userSchema);
module.exports = User