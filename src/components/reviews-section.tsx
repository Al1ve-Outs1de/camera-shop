import { useState } from 'react';
import type { Review } from '../types/review.type';
import ReviewComponent from './review';
import AddReviewBlockComponent from './add-review-block';

type ReviewsSectionProps = {
  reviews: Review[];
}

export default function ReviewsSectionComponent({ reviews }: ReviewsSectionProps) {
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [isShown, setShownStatus] = useState(reviews.length > 3);

  function showMoreComments() {
    const newIndex = reviewsToShow + 3;
    setReviewsToShow(newIndex);
    setShownStatus(newIndex <= reviews.length);
  }

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <AddReviewBlockComponent />
          <ul className="review-block__list">
            {reviews.slice(0, reviewsToShow).map((review) => <ReviewComponent review={review} key={review.id} />)}
          </ul>
          {isShown &&
            <div className="review-block__buttons">
              <button className="btn btn--purple" type="button" onClick={showMoreComments}>
                Показать больше отзывов
              </button>
            </div>}
        </div>
      </section>
    </div>
  );
}
