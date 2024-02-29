import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';

type AddItemSuccessProps = {
  onClick: () => void;
}

export default function AddItemSuccess({ onClick }: AddItemSuccessProps) {
  const navigate = useNavigate();
  const page = useLocation();

  function handleButtonClick() {
    if (page.pathname.includes(AppRoute.Product)) {
      navigate(AppRoute.Root);
    } else {
      onClick();
    }
  }

  return (
    <>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--transparent modal__btn" onClick={handleButtonClick}>
          Продолжить покупки
        </button>
        <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Basket}>
          Перейти в корзину
        </Link>
      </div>
    </>
  );
}
