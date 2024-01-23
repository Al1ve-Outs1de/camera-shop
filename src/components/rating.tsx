
type CardRatingProps = {
  rating: number;
}

export default function RatingComponent({ rating }: CardRatingProps) {
  const cardRating: JSX.Element[] = [];

  for (let i = 1; i <= 5; i++) {
    cardRating.push(
      <svg width={17} height={16} aria-hidden="true" key={i}>
        <use xlinkHref={i <= rating ? '#icon-full-star' : '#icon-star'} />
      </svg>
    );
  }

  return (
    cardRating
  );
}
