const mongoose = require("mongoose")

const assignmentsSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    }
})

const assignmentsModel = mongoose.model("assignments", assignmentsSchema)
module.exports = assignmentsModel