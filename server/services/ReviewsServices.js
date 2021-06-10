const ReviewsDAO = require('../dao/ReviewsDAO.js')

exports.getOne = (id) => new Promise(async (resolve, reject) => {
  try {
    const { rows: reviews } = await ReviewsDAO.getOne(id)
    resolve(reviews)
  } catch (error) {
    reject(error)
  }
})

exports.saveOne = (id, name, review, rating) => new Promise(async (resolve, reject) => {
  try {
    const { rows: newReview } = await ReviewsDAO.saveOne(id, name, review, rating)
    resolve(newReview)
  } catch (error) {
    reject(error)
  }
})