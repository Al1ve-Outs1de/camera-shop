import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ProductCardComponent from '../components/product-card/product-card';
import SimiliarProductsComponent from '../components/similar-products/similiar-products';
import ReviewsSectionComponent from '../components/reviews-section/reviews-section';
import { useGetProductReviewsQuery, useGetSimilarProductsQuery, useGetSpecificProductQuery } from '../redux/camerasApi';
import { AppRoute } from '../consts';
import LoadingSpinner from '../components/loading-spinner/loading-spinner';

export default function ProductPage() {
  const { id: productId } = useParams<{ id: string }>();

  const { isLoading: isProductLoading, data: product, isError, error } = useGetSpecificProductQuery(productId as string);
  const { isLoading: isSimilarLoading, data: similarProducts = [] } = useGetSimilarProductsQuery(productId as string);
  const { isLoading: isReviewsLoading, data: reviews = [] } = useGetProductReviewsQuery(productId as string);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isProductLoading || isSimilarLoading || isReviewsLoading) {
    return <LoadingSpinner />;
  }

  if (isError && 'status' in error && error.status === 404) {
    return <Navigate to={AppRoute.Error} replace />;
  }

  return (
    <>
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
                    {product?.name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            {product && <ProductCardComponent card={product} />}
          </div>
          {(similarProducts && similarProducts.length) && <SimiliarProductsComponent similarProducts={similarProducts} />}
          <ReviewsSectionComponent reviews={reviews} />
        </div>
      </main>
      <button className="up-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
    </>
  );
}
