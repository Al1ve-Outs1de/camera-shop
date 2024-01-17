import AsideFilterComponent from '../components/aside-filter-form';
import BannerSliderComponent from '../components/banner-slider';
import CatalogListComponent from '../components/catalog-list';
import PaginationComponent from '../components/pagination';
import SortingComponent from '../components/sorting';

export default function CatalogPage() {
  return (
    <main>
      <BannerSliderComponent />
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
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  Каталог
                </span>
              </li>
            </ul>
          </div>
        </div>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <AsideFilterComponent />
              </div>
              <div className="catalog__content">
                <SortingComponent />
                <CatalogListComponent />
                <PaginationComponent />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
