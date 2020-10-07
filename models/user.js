const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    number: { type: Number, required: true },
    role: { type: String, required: true },
    url: { type: String, default: 'https://cdn0.iconfinder.com/data/icons/human-diversity-avatars-color/64/human-avatar-user-ui-account-round-512.png' }

})

module.exports = mongoose.model('User', userSchema)