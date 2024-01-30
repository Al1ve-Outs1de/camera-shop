import { useAppDispatch } from '../hooks';
import { removeProductFromBasket } from '../redux/slices/basket/basket-slice';
import type { Card } from '../types/catalog-card.type';
import ProductImageComponent from './product-image';

type PopupCardRemoveComponentProps = {
  card: Card | null;
  onClick: () => void;
}

export default function PopupCardRemoveComponent({ card, onClick }: PopupCardRemoveComponentProps) {
  const dispatch = useAppDispatch();

  function handleRemoveButtonClick() {
    onClick();
    if (card) {
      dispatch(removeProductFromBasket(card.id));
    }
  }

  return (
    card && <>
      <p className="title title--h4">Удалить этот товар?</p>
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
            <li className="basket-item__list-item">{card.type} {card.category}</li>
            <li className="basket-item__list-item">{card.level} уровень</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={handleRemoveButtonClick}
        >
          Удалить
        </button>
        <a
          className="btn btn--transparent modal__btn modal__btn--half-width"
          href="#"
        >
          Продолжить покупки
        </a>
      </div></>
  );
}
