import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ProductCardComponent from '../../components/product-card/product-card';
import SimiliarProductsComponent from '../../components/similar-products/similiar-products';
import ReviewsSectionComponent from '../../components/reviews-section/reviews-section';
import { useGetProductReviewsQuery, useGetSimilarProductsQuery, useGetSpecificProductQuery } from '../../store/camerasApi';
import { AppRoute, NETWORK_ERROR_MESSAGE } from '../../consts';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { toast } from 'react-toastify';

export default function ProductPage() {
  const { id: productId } = useParams<{ id: string }>();

  const { isLoading: isProductLoading, data: product, isError: productError, error } = useGetSpecificProductQuery(productId as string);
  const { isLoading: isSimilarLoading, data: similarProducts = [], isError: similarProductsError } = useGetSimilarProductsQuery(productId as string);
  const { isLoading: isReviewsLoading, data: reviews = [], isError: productReviewsError } = useGetProductReviewsQuery(productId as string);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isProductLoading || isSimilarLoading || isReviewsLoading) {
    return <LoadingSpinner />;
  }

  if (error && 'status' in error && error.status === 404) {
    return <Navigate to={AppRoute.Error} replace />;
  }

  if (productError || similarProductsError || productReviewsError) {
    toast.error(NETWORK_ERROR_MESSAGE);
    return <main></main>;
  }

  return (
    <>
      <main>
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
                  <Link className="breadcrumbs__link" to={AppRoute.Root}>
                    Каталог
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </Link>
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
