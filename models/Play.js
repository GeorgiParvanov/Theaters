const mongoose = require('mongoose')
const { Schema, model: Model } = mongoose
const { String, Boolean, ObjectId } = Schema.Types

const playSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean
    },
    createdAt: {
        type: String,
        required: true
    },
    usersLiked: [{
        type: ObjectId,
        ref: 'User'
    }],
    creator: {
        type: ObjectId,
        ref: 'User'
    },
})

const Play = new Model('Play', playSchema)

const createPlay = async ({ title, description, imageUrl, createdAt, isPublic, creator }) => {
    await Play.create({ title, description, imageUrl, createdAt, isPublic, creator })
}

const findPlayById = async (id) => {
    return await Play.findById(id).lean()
}

const findByTitle = async (title) => {
    return await Play.findOne({ title })
}

const findPlayByIdAndUpdate = async (id, playData) => {
    await Play.findByIdAndUpdate(id, playData)
}

const findPlayByIdAndUpdateUsersLiked = async (playId, userId) => {
    await Play.findByIdAndUpdate(playId, { $push: { usersLiked: userId } })
}

const getPlaysSortedByUsersLikedDesc = async () => {
    return await Play.find().sort({ usersLiked: -1 }).lean()
}

const getPlaysSortedByCreatedAtDesc = async () => {
    return await Play.find().sort({ createdAt: -1 }).lean()
}

// gets the first 3 plays which have isPublic property set to true and are sorted by usersEnrooled in descending order
const getPublicPlaysByUsersEnrolledDesc = async () => {
    return await Play.find({ isPublic: true }).sort({ usersEnrolled: -1 }).limit(3).lean()
}

// gets plays which have isPublic property set to true and are sorted by createdAt in descending order
const getPublicPlaysByCreatedAtDesc = async () => {
    return await Play.find({ isPublic: true }).sort({ createdAt: -1 }).lean()
}

const deletePlayById = async (id) => {
    await Play.findByIdAndDelete(id)
}

module.exports = {
    createPlay,
    findPlayById,
    findByTitle,
    findPlayByIdAndUpdate,
    findPlayByIdAndUpdateUsersLiked,
    getPlaysSortedByCreatedAtDesc,
    getPlaysSortedByUsersLikedDesc,
    getPublicPlaysByCreatedAtDesc,
    getPublicPlaysByUsersEnrolledDesc,
    deletePlayById,
}