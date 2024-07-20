const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: String,
	isAdmin: Boolean,
})

userSchema.methods.generateJWT = function () {
	return jwt.sign(
		{ username: this.username, isAdmin: this.isAdmin },
        process.env.jwtPrivateKey	)
}
const User = mongoose.model('User', userSchema);
module.exports = User