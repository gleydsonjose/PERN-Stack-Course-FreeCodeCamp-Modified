import { useEffect, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useHistory } from 'react-router-dom'
import StarRating from './StarRating'
import { MouseEvent } from 'react'
import { RestaurantInterface } from '../interfaces/RestaurantInterfaces'

const RestaurantList = () => {
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

  const handlerUpdate = (event: MouseEvent<HTMLElement>, id: number) => {
    event.stopPropagation()

    history.push(`/restaurants/${id}/update`)
  }

  const handlerDelete = async (event: MouseEvent<HTMLElement>, id: number) => {
    event.stopPropagation()

    try {
      await RestaurantFinder.delete(`/${id}`)
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleRestaurantSelect = (id: number) => {
    history.push(`/restaurants/${id}`)
  }

  const renderRating = (restaurant: RestaurantInterface) => {
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
                  <button className="btn btn-warning" onClick={(event) => handlerUpdate(event, restaurant.id)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={(event) => handlerDelete(event, restaurant.id)}>
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
