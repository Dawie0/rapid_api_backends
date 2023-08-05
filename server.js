const express = require("express")
const axios = require("axios")
const cors = require("cors")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})

app.get('/api/location', async (req, res) => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY
        const locationOptions = {
            method: "GET",
            url: "https://realty-in-us.p.rapidapi.com/locations/auto-complete",
            params: { input: req.query.keyword },
            headers: {
                "x-rapidapi-host": "realty-in-us.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        }
        const response = await axios.request(locationOptions)
        res.status(200).json(response.data)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server Error' })
    }
})

app.get('/api/properties', async (req, res) => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
        const propertiesOptions = {
            method: "GET",
            url: "https://realty-in-us.p.rapidapi.com/properties/list-for-sale",
            params: {
                state_code: req.query.state_code,
                city: req.query.city,
                offset: "0",
                limit: "20",
                sort: req.query.sort,
                beds_min: req.query.beds,
            },
            headers: {
                "x-rapidapi-host": "realty-in-us.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        }

        const response = await axios.request(propertiesOptions)
        res.status(200).json(response.data)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server Error' })
    } 
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})