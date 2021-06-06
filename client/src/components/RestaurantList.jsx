import React, { useEffect, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useHistory } from 'react-router-dom'
import StarRating from '../components/StarRating'

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)
  let history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/")
        setRestaurants(response.data.data.restaurants)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const handlerUpdate = (e, id) => {
    e.stopPropagation()

    history.push(`/restaurants/${id}/update`)
  }

  const handlerDelete = async (e, id) => {
    e.stopPropagation()

    try {
      await RestaurantFinder.delete(`/${id}`)
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`)
  }

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>
    }

    return (
      <>
        <StarRating rating={restaurant.id} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    )
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.map(restaurant => {
            return (
              <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td>
                  <button className="btn btn-warning" onClick={(e) => handlerUpdate(e, restaurant.id)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={(e) => handlerDelete(e, restaurant.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
