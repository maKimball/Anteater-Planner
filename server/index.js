const express = require("express")
const app = express()
const mongoose = require("mongoose")
const classesModel = require('./models/classes')
const assignmentsModel = require('./models/assignments')

const cors = require('cors')

app.use(express.json())
app.use(cors())

const user = "momo"
const pass = "meow123"
const url = `mongodb+srv://${user}:${pass}@cluster0.cqbs7vq.mongodb.net/ClassInfo?retryWrites=true&w=majority`

mongoose.connect(url)

//Classes
app.get("/getClasses", (req, res) => {
    classesModel.find({}, (error, result) => {
        try {
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    })
})

app.post("/createClass", async (req, res) => {
    const class1 = req.body
    const newClass = new classesModel(class1)
    await newClass.save()
    res.json(class1)
})

//Assignments
app.get("/getAssignments", (req, res) => {
    assignmentsModel.find({}, (error, result) => {
        try {
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    })
})

app.post("/createAssignment", async (req, res) => {
    const assignment = req.body
    const newAssignment = new assignmentsModel(assignment)
    await newAssignment.save()
    res.json(assignment)
})

app.listen(3001, () => {
    console.log('Server runs wowowow!')
})