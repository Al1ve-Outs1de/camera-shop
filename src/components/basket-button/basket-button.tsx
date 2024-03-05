import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getBasketProducts } from '../../store/slices/basket/selectors';

export default function BasketButtonComponent() {
  const basketProductsCount = useAppSelector(getBasketProducts).reduce((accumulator, currentObject) => accumulator + currentObject.count, 0);

  return (
    <Link className="header__basket-link" to={AppRoute.Basket}>
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      {!!basketProductsCount && <span className="header__basket-count" data-testid='products-count'>{basketProductsCount}</span>}
    </Link>
  );
}
