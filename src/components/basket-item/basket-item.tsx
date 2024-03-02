import { memo, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { decrementProductCount, incrementProductCount, setProductCount } from '../../store/slices/basket/basket-slice';
import { BasketProduct } from '../../types/bakset-product.type';
import ProductImageComponent from '../product-image/product-image';

type BasketItemProps = {
  item: BasketProduct;
  onClick: (id: number) => void;
}

const BasketItemComponent = memo(({ item: { card, count }, onClick }: BasketItemProps) => {
  const dispatch = useAppDispatch();
  const countRef = useRef<HTMLInputElement>(null);

  useEffect(() => {

    function handleCountChange(this: HTMLInputElement) {
      let countValue = Number(this.value);

      if (countValue < 1 || countValue > 99) {
        countValue = Math.max(1, Math.min(countValue, 99));
        this.value = countValue.toString();
      }

      dispatch(setProductCount({
        productId: card.id, count: countValue
      }));
    }

    countRef.current?.addEventListener('change', handleCountChange);
  }, [dispatch, card.id]);

  useEffect(() => {
    if (countRef.current) {
      countRef.current.value = count.toString();
    }
  }, [count]);

  return (
    <li className="basket-item" data-testid='basket-item'>
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
          data-testid='productCount'
          type="number"
          id="counter1"
          defaultValue={count}
          min={1}
          max={99}
          aria-label="количество товара"
          ref={countRef}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => dispatch(incrementProductCount(card.id))}
          disabled={count >= 99}
          data-testid='incCount'
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
);

BasketItemComponent.displayName = 'BasketItem';

export default BasketItemComponent;
