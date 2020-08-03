const mongoose = require('mongoose')
const { Schema, model: Model } = mongoose
const { String, ObjectId } = Schema.Types
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 11;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    likedPlays: [{
        type: ObjectId,
        ref: 'Play'
    }]
})

userSchema.methods = {
    passwordsMatch(password) {
        return bcrypt.compare(password, this.password)
    }
}

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {

        // TODO: the two lines bellow can be a func prob in utils folder
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        this.password = hashedPassword;
    }
    next()
})

const User = new Model('User', userSchema)

const createUser = async (userData) => {
    await User.create(userData)
}

const findByUsername = async (username) => {
    return await User.findOne({ username })
}

const findUserByIdAndUpdateLikedPlays = async (userId, playId) => {
    await User.findByIdAndUpdate(userId, {$push: {likedPlays: playId}})
}

module.exports = {
    User,
    createUser,
    findByUsername,
    findUserByIdAndUpdateLikedPlays,
}