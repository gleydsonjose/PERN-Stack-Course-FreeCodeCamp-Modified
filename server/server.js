require('dotenv').config()
const db = require('./db')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    // const { rows } = await db.query('SELECT * FROM restaurants')
    const { rows } = await db.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id')
    

    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: {
        restaurants: rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

//Get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params
    const restaurant = await db.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1;', [id])
    const reviews = await db.query('SELECT * FROM reviews WHERE restaurant_id = $1', [id])


    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

// Create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const { name, location, price_range } = req.body
    const { rows } = await db.query('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *', [name, location, price_range])

    res.status(201).json({
      status: 'success',
      data: {
        restaurant: rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})

// Update restaurants
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, location, price_range } = req.body
    const { rows } = await db.query('UPDATE restaurants SET name = $2, location = $3, price_range = $4 WHERE id = $1 RETURNING *', [id, name, location, price_range])

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params
    const results = await db.query('DELETE FROM restaurants WHERE id = $1', [id])
    console.log(results)

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
    const { rows } = await db.query('INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *', [id, name, review, rating])

    res.status(201).json({
      status: 'success',
      data: {
        review: rows[0]
      }
    })
  } catch (err) {
    console.error(err)
  }
})

app.listen(port, () => {
  console.log(`Server is up and listen on port ${port}`)
})