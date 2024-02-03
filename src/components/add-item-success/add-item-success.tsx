import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

type AddItemSuccessProps = {
  onClick: () => void;
}

export default function AddItemSuccess({ onClick }: AddItemSuccessProps) {
  return (
    <>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--transparent modal__btn" onClick={onClick}>
          Продолжить покупки
        </button>
        <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Basket}>
          Перейти в корзину
        </Link>
      </div>
    </>
  );
}
