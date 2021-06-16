import { Dispatch, SetStateAction } from 'react'
import { ReviewInterface } from './ReviewInterfaces';

export interface RestaurantInterface {
  id: number;
  name: string;
  location: string;
  price_range: number;
  count?: number;
  average_rating?: number;
}

export interface RestaurantWithReviewsInterface {
  restaurant: RestaurantInterface;
  reviews: ReviewInterface[];
}

export interface RestaurantsContextInterface {
  restaurants: RestaurantInterface[];
  setRestaurants: Dispatch<SetStateAction<RestaurantInterface[]>>;
  addRestaurants: (restaurant: RestaurantInterface) => void;
  selectedRestaurant: RestaurantWithReviewsInterface | null;
  setSelectedRestaurant: Dispatch<SetStateAction<null>>;
}