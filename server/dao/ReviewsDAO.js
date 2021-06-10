const db = require('../database')

exports.getOne = (id) => db.query('SELECT * FROM reviews WHERE restaurant_id = $1', [id])

exports.saveOne = (id, name, review, rating) => db.query('INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *', [id, name, review, rating])