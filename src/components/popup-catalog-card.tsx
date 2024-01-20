import type { CatalogCard } from '../types/catalog-card-type';

type PopupCatalogCardProps = {
  card: CatalogCard;
}

export default function PopupCatalogCardComponent({ card }: PopupCatalogCardProps) {
  return (
    <>
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`${card.previewImgWebp}, ${card.previewImgWebp2x} 2x`}
            />
            <img
              src="img/content/orlenok.jpg"
              srcSet="img/content/orlenok@2x.jpg 2x"
              width={140}
              height={120}
              alt={card.name}
            />
          </picture>
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
            <span className="visually-hidden">Цена:</span>{card.price} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
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
