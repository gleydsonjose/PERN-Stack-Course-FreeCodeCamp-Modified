import { useState, createContext, PropsWithChildren } from 'react'
import { RestaurantInterface, RestaurantsContextInterface } from '../interfaces/RestaurantInterfaces'

export const RestaurantsContext = createContext({} as RestaurantsContextInterface)
export const RestaurantsContextProvider = (props: PropsWithChildren<unknown>) => {
  const [restaurants, setRestaurants] = useState<RestaurantInterface[]>([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const addRestaurants = (restaurant: RestaurantInterface) => {
    setRestaurants([...restaurants, restaurant])
  }

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant
      }}>
      {props.children}
    </RestaurantsContext.Provider>
  )
}
