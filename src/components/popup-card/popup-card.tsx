
import type { Card } from '../../types/catalog-card.type';
import ProductImageComponent from '../product-image/product-image';

type PopupCatalogCardProps = {
  card: Card | null;
  onAddButtonClick: () => void;
}

export default function PopupCatalogCardComponent({ card, onAddButtonClick }: PopupCatalogCardProps) {
  return (
    card &&
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
          onClick={onAddButtonClick}
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Добавить в корзину
        </button>
      </div>
    </>
  );
}
