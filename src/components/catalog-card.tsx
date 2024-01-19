import type { CatalogCard } from '../types/catalog-card-type';

type CatalogCardProps = {
  catalogCard: CatalogCard;
}

export default function CatalogCardComponent({ catalogCard }: CatalogCardProps) {
  const cardRating: JSX.Element[] = [];

  for (let i = 1; i <= 5; i++) {
    cardRating.push(
      <svg width={17} height={16} aria-hidden="true" key={i}>
        <use xlinkHref={i <= catalogCard.rating ? '#icon-full-star' : '#icon-star'} />
      </svg>
    );
  }

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${catalogCard.previewImgWebp}, ${catalogCard.previewImgWebp2x} 2x`}
          />
          <img
            src={`${catalogCard.previewImg}`}
            srcSet={`${catalogCard.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={catalogCard.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {cardRating}
          <p className="visually-hidden">Рейтинг: {catalogCard.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{catalogCard.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {catalogCard.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{catalogCard.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <a className="btn btn--transparent" href="#">
          Подробнее
        </a>
      </div>
    </div>
  );
}
