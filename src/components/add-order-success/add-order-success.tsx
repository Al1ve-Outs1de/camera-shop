import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

export default function AddOrderSuccess() {
  return (
    <>
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link to={AppRoute.Root} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
        </Link>
      </div>
    </>
  );
}
