import AsideFilterComponent from '../components/aside-filter-form';
import BannerSliderComponent from '../components/banner-slider';
import CatalogListComponent from '../components/catalog-list';
import SortingComponent from '../components/sorting';
import { useGetProductsQuery, useGetPromosQuery } from '../redux/camerasApi';

export default function CatalogPage() {

  const { isLoading: isProductsLoading } = useGetProductsQuery();
  const { isLoading: isPromosLoading, data: promos } = useGetPromosQuery();

  if (isProductsLoading || isPromosLoading) {
    return <main><h1>loading</h1></main>;
  }

  return (
    <main>
      {promos && <BannerSliderComponent promos={promos} />}
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
