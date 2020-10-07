const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true}, 
    skill: { type: String, required: true },
    salary: { type: String, required: true },
    experience: { type: String }

})

module.exports = mongoose.model('Job', jobSchema)