import { StarRatingComponentProps } from '../interfaces/StarRatingInterfaces'

const StarRating = ({rating}: StarRatingComponentProps) => {
  const stars = []
  const currentRating = rating || 0

  for(let i = 1; i <= 5; i++) {
    if (i <= currentRating) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>)
    } else if (i === Math.ceil(currentRating) && !Number.isInteger(currentRating)) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>)
    } else {
      stars.push(<i key={i} className="far fa-star text-warning"></i>)
    }
  }

  return (
    <>
      {stars}
    </>
  )
}

export default StarRating
