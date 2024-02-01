import { memo } from 'react';
import type { Review } from '../../types/review.type';
import RatingComponent from '../rating/rating';

type ReviewProps = {
  review: Review;
}

const reviewComponent = memo(({ review }: ReviewProps) => {
  const date = new Date(review.createAt);
  const dateToShow = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  const dateForTag = date.toLocaleDateString('en-CA');

  return (
    <li className="review-card" data-testid='review-item'>
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={dateForTag} data-testid='review-date'>
          {dateToShow}
        </time>
      </div>
      <div className="rate review-card__rate">
        <RatingComponent rating={review.rating} />
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {review.advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">
            {review.disadvantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review.review}
          </p>
        </li>
      </ul>
    </li>
  );
});

reviewComponent.displayName = 'Review';

export default reviewComponent;
