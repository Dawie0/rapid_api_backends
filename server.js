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
            url: "https://realty-in-us.p.rapidapi.com/locations/v2/auto-complete",
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
            url: "https://realty-in-us.p.rapidapi.com/properties/v3/list-for-sale",
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


app.get('/api/news/', async (req, res) => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
        const newsOptions = {
            method: "GET",
            url: "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news",
            params: {
                pair_ID: "1057391",
                page: req.query.page,
                time_utc_offset: "28800",
                lang_ID: "1",
            },
            headers: {
                "x-rapidapi-host": "investing-cryptocurrency-markets.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        }

        const response = await axios.request(newsOptions)
        res.status(200).json(response.data)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server Error' })
    } 
})


app.get('/api/recipe', async (req, res) => {
    const { keyword, diet, exclude } = req.query;
    const apiKey = process.env.SPOONACULAR_API
    try {
        const response = await axios.get(
          'https://api.spoonacular.com/recipes/complexSearch',
          {
            params: {
              apiKey: apiKey,
              query: keyword,
              diet: diet,
              excludeIngredients: exclude,
              // You can add more query parameters as needed
            },
          }
        );
        res.json(response.data);
    }

    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server Error' })
    }

})

 

app.get('/api/recipe-details/:recipeID', async (req, res) => {
    const { recipeID } = req.params
    const apiKey = process.env.SPOONACULAR_API
    try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${recipeID}/information`,
          {
            params: {
              apiKey: apiKey, // Replace with your API key
            },
          }
        );

        res.json(response.data)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occurred' })
    }
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})