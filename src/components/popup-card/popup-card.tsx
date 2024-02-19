import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { addProductToBasket as dispatchProductToBasket } from '../../store/slices/basket/basket-slice';
import type { Card } from '../../types/catalog-card.type';
import ProductImageComponent from '../product-image/product-image';
import AddItemSuccess from '../add-item-success/add-item-success';

type PopupCatalogCardProps = {
  card: Card | null;
  onClick: () => void;
}

export default function PopupCatalogCardComponent({ card, onClick }: PopupCatalogCardProps) {
  const dispatch = useAppDispatch();
  const [isAdded, setAddedStatus] = useState(false);

  function addProductToBasket(product: Card) {
    dispatch(dispatchProductToBasket(product));
    setAddedStatus(!isAdded);
  }

  useEffect(() => () => {
    setAddedStatus(false);
  }, [card]);

  return (
    !isAdded && card ?
      <>
        <p className="title title--h4">Добавить товар в корзину</p>
        <div className="basket-item basket-item--short">
          <div className="basket-item__img">
            <ProductImageComponent cardImage={card} />
          </div>
          <div className="basket-item__description">
            <p className="basket-item__title">{card.name}</p>
            <ul className="basket-item__list">
              <li className="basket-item__list-item">
                <span className="basket-item__article">Артикул: </span>
                <span className="basket-item__number">{card.vendorCode}</span>
              </li>
              <li className="basket-item__list-item">{`${card.type} ${card.category}`}</li>
              <li className="basket-item__list-item">Любительский уровень</li>
            </ul>
            <p className="basket-item__price">
              <span className="visually-hidden">Цена:</span>{card.price.toLocaleString()} ₽
            </p>
          </div>
        </div>
        <div className="modal__buttons">
          <button
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={() => addProductToBasket(card)}
          >
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Добавить в корзину
          </button>
        </div>
      </>
      : <AddItemSuccess onClick={onClick} />
  );
}
