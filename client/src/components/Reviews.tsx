import StarRating from './StarRating'
import { ReviewsComponentPropsInterface } from '../interfaces/ReviewInterfaces'

const Reviews = ({reviews}: ReviewsComponentPropsInterface) => {
  return (
    <div className="row row-cols-3 mb-2">
      {reviews && reviews.map((review) => {
        return (
          <div
            className="card text-white bg-primary mb-3 mr-4"
            style={{maxWidth: '30%'}}
            key={review.id}
          >
            <div className="card-header d-flex justify-content-between">
              <span>{review.name}</span>
              <span><StarRating rating={review.rating}/></span>
            </div>
    
            <div className="card-body">
              <p className="card-text">{review.review}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Reviews
