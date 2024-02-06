import { toast } from 'react-toastify';
import AsideFilterComponent from '../../components/aside-filter-form/aside-filter-form';
import BannerSliderComponent from '../../components/banner-slider/banner-slider';
import CatalogListComponent from '../../components/catalog-list/catalog-list';
import SortingComponent from '../../components/sorting/sorting';
import { useGetProductsQuery, useGetPromosQuery } from '../../redux/camerasApi';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { NETWORK_ERROR_MESSAGE } from '../../consts';

export default function CatalogPage() {

  const { isLoading: isProductsLoading, isError: productsError } = useGetProductsQuery();
  const { isLoading: isPromosLoading, data: promos, isError: promosError } = useGetPromosQuery();

  if (isProductsLoading || isPromosLoading) {
    return <LoadingSpinner />;
  }

  if (productsError || promosError) {
    toast.error(NETWORK_ERROR_MESSAGE);
    return <main></main>;
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
