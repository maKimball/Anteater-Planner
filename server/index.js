const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userModel = require('./models/users')

const cors = require('cors')

app.use(express.json())
app.use(cors())

const user = "momo"
const pass = "meow123"
const url = `mongodb+srv://${user}:${pass}@cluster0.cqbs7vq.mongodb.net/testDB?retryWrites=true&w=majority`

mongoose.connect(url)

app.get("/getUsers", (req, res) => {
    userModel.find({}, (error, result) => {
        try {
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    })
})

app.post("/createUser", async (req, res) => {
    const user = req.body
    console.log(user)
    const newUser = new userModel(user)
    await newUser.save()

    res.json(user)
})


app.listen(3001, () => {
    console.log('Server runs wowowow!')
})