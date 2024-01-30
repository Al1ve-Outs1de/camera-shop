import { ChangeEvent, memo } from 'react';
import { useAppDispatch } from '../hooks';
import { decrementProductCount, incrementProductCount, setProductCount } from '../redux/slices/basket/basket-slice';
import { BasketProduct } from '../types/bakset-product.type';
import ProductImageComponent from './product-image';

type BasketItemProps = {
  item: BasketProduct;
  onClick: (id: number) => void;
}

function BasketItemComponent({ item: { card, count }, onClick }: BasketItemProps) {
  const dispatch = useAppDispatch();

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <ProductImageComponent cardImage={card} />
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{card.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{card.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{card.type} {card.category}</li>
          <li className="basket-item__list-item">{card.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{card.price.toLocaleString()} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={count === 1}
          onClick={() => dispatch(decrementProductCount(card.id))}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          value={count}
          min={1}
          max={99}
          aria-label="количество товара"
          onInput={(evt: ChangeEvent<HTMLInputElement>) => dispatch(setProductCount({
            productId: card.id, count: Math.min(Number(evt.target.value) || 1, 99)
          }))}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => dispatch(incrementProductCount(card.id))}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{(card.price * count).toLocaleString()} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => onClick(card.id)}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

const memoBasketItem = memo(BasketItemComponent);

export default memoBasketItem;
