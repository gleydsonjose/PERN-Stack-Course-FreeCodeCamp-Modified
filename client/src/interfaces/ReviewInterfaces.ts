export interface ReviewInterface {
  id: number;
  restaurant_id: number;
  name: string;
  review: string;
  rating: number;
}

export interface ReviewsComponentPropsInterface {
  reviews: ReviewInterface[] | undefined
}