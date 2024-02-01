
type CardRatingProps = {
  rating: number;
}

export default function RatingComponent({ rating }: CardRatingProps) {
  const cardRating: JSX.Element[] = [];

  for (let i = 1; i <= 5; i++) {
    cardRating.push(
      <use xlinkHref={i <= rating ? '#icon-full-star' : '#icon-star'} data-testid={i <= rating ? 'full-star' : ''} />
    );
  }

  return (
    <>
      {cardRating.map((cardStar) => (
        <svg width={17} height={16} aria-hidden="true" key={cardStar.key}>
          {cardStar}
        </svg>
      ))}
    </>
  );
}
