import { Link } from 'react-router-dom';
import type { Card } from '../types/catalog-card.type';
import { AppRoute } from '../consts';
import ProductImageComponent from './product-image';
import RatingComponent from './rating';
import { useAppSelector } from '../hooks';
import { getBasketProducts } from '../redux/slices/basket/selectors';
import InBasketButtonComponent from './in-basket-button';
import { memo } from 'react';

type CatalogCardProps = {
  catalogCard: Card;
  onClick: (id: number) => void;
}

function CardComponent({ catalogCard, onClick }: CatalogCardProps) {

  const productsInBasket = useAppSelector(getBasketProducts);

  const isInBasket = productsInBasket.some((product) => product.card.id === catalogCard.id);

  return (
    <div>
      <div className="product-card__img">
        <ProductImageComponent cardImage={catalogCard} />
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingComponent rating={catalogCard.rating} />
          <p className="visually-hidden">Рейтинг: {catalogCard.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{catalogCard.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {catalogCard.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{catalogCard.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isInBasket ?
          <InBasketButtonComponent />
          :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={() => onClick(catalogCard.id)}
          >
            Купить
          </button>}

        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${catalogCard.id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

const memoCard = memo(CardComponent, (prev, next) => prev.catalogCard === next.catalogCard);

export default memoCard;
