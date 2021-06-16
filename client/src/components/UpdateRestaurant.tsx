import { useState, useEffect, MouseEvent } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)
        setName(response.data.data.restaurant.name)
        setLocation(response.data.data.restaurant.location)
        setPriceRange(response.data.data.restaurant.price_range)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const handlerSubmit = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()

    try {
      await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange
      })

      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            value={priceRange}
            onChange={event => setPriceRange(event.target.value)}
            id="price_range"
            className="form-control"
            type="number"
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={(event) => handlerSubmit(event)}
        >
          Submit
        </button>
      </form>    
    </div>
  )
}

export default UpdateRestaurant
