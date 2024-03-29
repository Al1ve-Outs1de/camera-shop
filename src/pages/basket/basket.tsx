
import BasketProductsListComponent from '../../components/basket-products-list/basket-products-list';
import BasketSummaryComponent from '../../components/basket-summary/basket-summary';
import { useAppSelector } from '../../hooks';
import { useScrollToTop } from '../../hooks/use-scroll-to-top';
import { getBasketProducts } from '../../store/slices/basket/selectors';

export default function BasketPage() {
  const isBasketNotEmpty = !!useAppSelector(getBasketProducts).length;
  useScrollToTop();

  return (
    <main>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="index.html">
                  Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="catalog.html">
                  Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </a>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  Корзина
                </span>
              </li>
            </ul>
          </div>
        </div>
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            {isBasketNotEmpty && <BasketProductsListComponent />}
            <BasketSummaryComponent />
          </div>
        </section>
      </div>
    </main>

  );
}
