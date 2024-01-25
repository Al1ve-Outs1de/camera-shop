import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ProductCardComponent from '../components/product-card';
import SimiliarProductsComponent from '../components/similiar-products';
import type { Card } from '../types/catalog-card.type';
import type { Review } from '../types/review.type';
import ReviewsSectionComponent from '../components/reviews-section';
import { useGetProductReviewsQuery, useGetSimilarProductsQuery, useGetSpecificProductQuery } from '../redux/camerasApi';
import { AppRoute } from '../consts';

export default function ProductPage() {
  const { id: productId } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Card | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [similiarProducts, setSimiliarProducts] = useState<Card[]>([]);

  const { isLoading: isProductLoading, isError, error } = useGetSpecificProductQuery(productId as string);
  const { isLoading: isSimilarLoading } = useGetSimilarProductsQuery(productId as string);
  const { isLoading: isReviewsLoading } = useGetProductReviewsQuery(productId as string);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (productId) {
      Promise.all([
        axios.get<Card>(`https://camera-shop.accelerator.pages.academy/cameras/${productId}`),
        axios.get<Review[]>(`https://camera-shop.accelerator.pages.academy/cameras/${productId}/reviews`),
        axios.get<Card[]>(`https://camera-shop.accelerator.pages.academy/cameras/${productId}/similar`)
      ]).then(([{ data: card }, { data: productReviews }, { data: productSimiliarProducts }]) => {
        const sortedReviews = productReviews.sort((reviewDateA, reviewDateB) => new Date(reviewDateB.createAt).valueOf() - new Date(reviewDateA.createAt).valueOf());

        setProduct(card);
        setReviews(sortedReviews);
        setSimiliarProducts(productSimiliarProducts);
      });
    }
  }, [productId]);

  if (isProductLoading || isSimilarLoading || isReviewsLoading) {
    return <main><h1>Loading</h1></main>;
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
          {!!similiarProducts.length && <SimiliarProductsComponent similarProducts={similiarProducts} />}
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
