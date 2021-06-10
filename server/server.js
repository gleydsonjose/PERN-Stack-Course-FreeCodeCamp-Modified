require('dotenv').config()
const db = require('./database')
const RestaurantsServices = require('./services/RestaurantsServices.js')
const ReviewsServices = require('./services/ReviewsServices.js')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const restaurants = await RestaurantsServices.getAllWithReviewsDetails()

    res.status(200).json({
      status: 'success',
      results: restaurants.length,
      data: { restaurants }
    })
  } catch (err) {
    console.log('restaurantsError', err)
  }
})

app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params
    const restaurant = await RestaurantsServices.getOneWithReviewsDetails(id)
    const reviews = await ReviewsServices.getOne(id)

    res.status(200).json({
      status: 'success',
      data: { restaurant, reviews }
    })
  } catch (err) {
    console.log(err)
  }
})

app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const { name, location, price_range } = req.body
    const restaurant = await RestaurantsServices.saveOne(name, location, price_range)

    res.status(201).json({
      status: 'success',
      data: { restaurant }
    })
  } catch (err) {
    console.log(err)
  }
})

app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, location, price_range } = req.body
    const restaurant = RestaurantsServices.updateOne(id, name, location, price_range)

    res.status(200).json({
      status: 'success',
      data: { restaurant }
    })
  } catch (err) {
    console.log(err)
  }
})

app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params
    await RestaurantsServices.deleteOne(id)

    res.status(204).json({
      status: 'success'
    })
  } catch (err) {
    console.log(err)
  }
})

app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  try {
    const { id } = req.params
    const { name, review, rating } = req.body
    const newReview = await ReviewsServices.saveOne(id, name, review, rating)

    res.status(201).json({
      status: 'success',
      data: { review: newReview }
    })
  } catch (err) {
    console.error(err)
  }
})

app.listen(port, () => {
  console.log(`Server is up and listen on port ${port}`)
})