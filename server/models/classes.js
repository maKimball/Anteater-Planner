const mongoose = require("mongoose")

const classesSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    },
    Monday: {
        type: Array
    }, 
    Tuesday:{
        type: Array
    }, 
    Wednesday:{
        type: Array
    }, 
    Thursday:{
        type: Array
    }, 
    Friday:{
        type: Array
    }, 
})

const classesModel = mongoose.model("classes", classesSchema)
module.exports = classesModel