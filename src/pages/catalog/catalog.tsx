import { toast } from 'react-toastify';
import BannerSliderComponent from '../../components/banner-slider/banner-slider';
import { useGetProductsQuery, useGetPromosQuery } from '../../store/camerasApi';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { AppRoute, NETWORK_ERROR_MESSAGE } from '../../consts';
import { Link } from 'react-router-dom';
import CatalogContentComponent from '../../components/catalog-content/catalog-content';

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
                <Link className="breadcrumbs__link" to={AppRoute.Root}>
                  Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link breadcrumbs__link--active" to={AppRoute.Root}>
                  Каталог
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <CatalogContentComponent />
          </div>
        </section>
      </div>
    </main>
  );
}
