const RestaurantsDAO = require('../dao/RestaurantsDAO.js')

exports.getAllWithReviewsDetails = () => new Promise(async (resolve, reject) => {
  try {
    const { rows: restaurants } = await RestaurantsDAO.getAllWithReviewsDetails()
    resolve(restaurants)
  } catch (error) {
    reject(error)
  }
})

exports.getOneWithReviewsDetails = (id) => new Promise(async (resolve, reject) => {
  try {
    const { rows: restaurant } = await RestaurantsDAO.getOneWithReviewsDetails(id)
    resolve(restaurant[0])
  } catch (error) {
    reject(error)
  }
})

exports.saveOne = (name, location, price_range) => new Promise(async (resolve, reject) => {
  try {
    const { rows: restaurant } = await RestaurantsDAO.saveOne(name, location, price_range)
    resolve(restaurant[0])
  } catch (error) {
    reject(error)
  }
})

exports.updateOne = (id, name, location, price_range) => new Promise(async (resolve, reject) => {
  try {
    const { rows: restaurant } = await RestaurantsDAO.updateOne(id, name, location, price_range)
    resolve(restaurant[0])
  } catch (error) {
    reject(error)
  }
})

exports.deleteOne = (id) => new Promise(async (resolve, reject) => {
  try {
    await RestaurantsDAO.deleteOne(id)
    resolve(true)
  } catch (error) {
    reject(error)
  }
})