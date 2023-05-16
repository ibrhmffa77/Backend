const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const mongoose = require("mongoose");
const { Schema } = mongoose;
const url = "mongodb+srv://rqsanibrahimli:ragsna77@cluster0.tesrc2u.mongodb.net/";

mongoose.connect(url).then(() => {
    app.listen(8080, () => {
        console.log('Server upped');
    })
})

const areasSchema = new Schema({
    image: String,
    title: String,
    content: String,
},
    { timestamps: true }
)
const Areas = mongoose.model('areas', areasSchema);
app.get('/areas', async (req, res) => {
    try {
        const areas = await Areas.find({})
        res.status(200).json(areas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.post('/areas', async (req, res) => {
    try {
        const areas = await Areas.create(req.body)
        res.status(200).json(areas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})