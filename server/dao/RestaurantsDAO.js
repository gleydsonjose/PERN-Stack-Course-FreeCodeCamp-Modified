const db = require('../database')

exports.getAllWithReviewsDetails = () => db.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id')

exports.getOneWithReviewsDetails = (id) => db.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1;', [id])

exports.saveOne = (name, location, price_range) => db.query('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *', [name, location, price_range])

exports.updateOne = (id, name, location, price_range) => db.query('UPDATE restaurants SET name = $2, location = $3, price_range = $4 WHERE id = $1 RETURNING *', [id, name, location, price_range])

exports.deleteOne = (id) => db.query('DELETE FROM restaurants WHERE id = $1', [id])
