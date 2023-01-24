const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    age: {
        type: String,
        default: 'Select your age group',
        enum: ['Select your age group','teen','youth','adult','elder'],
    },
    gender: {
        type: String,
        enum: ['male','female','transgender'],
    },
    occupation: {
        type: String,
        default: 'Select your occupation',
        enum: ['Select your occupation','student','employee','ministry','others'],
    },
    salvation: {
        type: String,
        enum: ['yes','no'],
    },
    salv: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        default: 'Select the category of request',
        enum: ['Select the category of request','physical','mental','spiritual','social'],
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public','private'],
    },
    body: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    rep1 : { type : Array , "default" : [] }
})

module.exports = mongoose.model('Story', StorySchema)
