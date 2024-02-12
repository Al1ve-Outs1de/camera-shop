import { Link, NavLink } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getBasketProducts } from '../../redux/slices/basket/selectors';
import SearchInputComponent from '../form-search/form-search';

export default function HeaderComponent() {
  const basketProductsCount = useAppSelector(getBasketProducts).length;

  return (
    <header className="header" id="header">
      <div className="container">
        <NavLink
          style={({ isActive }) => ({
            pointerEvents: isActive ? 'none' : undefined
          })}
          className="header__logo"
          to={AppRoute.Root}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </NavLink>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink className="main-nav__link" to={AppRoute.Root} style={({ isActive }) => ({
                pointerEvents: isActive ? 'none' : undefined
              })}
              >
                Каталог
              </NavLink>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <SearchInputComponent />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          {!!basketProductsCount && <span className="header__basket-count" data-testid='products-count'>{basketProductsCount}</span>}
        </Link>
      </div>
    </header >
  );
}
