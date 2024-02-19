import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Card } from '../types/catalog-card.type';
import type { Promo } from '../types/promo.type';
import type { Review } from '../types/review.type';
import type { NewReview } from '../types/new-review.type';
import { SERVER_BASE_URL } from '../consts';
import { NewOrder } from '../types/new-order.type';

export const camerasApi = createApi({
  reducerPath: 'cameras',
  tagTypes: ['Review'],
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Card[], void>({
      query: () => '/cameras',
    }),
    getPromos: builder.query<Promo[], void>({
      query: () => '/promo',
    }),
    getSpecificProduct: builder.query<Card, string>({
      query: (id) => `/cameras/${id}`,
    }),
    getSimilarProducts: builder.query<Card[], string>({
      query: (id) => `/cameras/${id}/similar`,
    }),
    getProductReviews: builder.query<Review[], string>({
      query: (id) => `/cameras/${id}/reviews`,
      transformResponse: (response: Review[]) =>
        response.sort(
          (reviewA, reviewB) =>
            +new Date(reviewB.createAt) - +new Date(reviewA.createAt)
        ),
      providesTags: ['Review'],
    }),
    createNewReview: builder.mutation<Review, NewReview>({
      query: (review) => ({
        url: '/reviews',
        method: 'POST',
        body: review,
      }),
      invalidatesTags: (result) => (result ? ['Review'] : []),
    }),
    getCouponPromo: builder.mutation<number, string>({
      query: (promo) => ({
        url: '/coupons',
        method: 'POST',
        body: { coupon: promo },
      }),
    }),
    createNewOrder: builder.mutation<void, NewOrder>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetPromosQuery,
  useGetSpecificProductQuery,
  useGetSimilarProductsQuery,
  useGetProductReviewsQuery,
  useCreateNewReviewMutation,
  useGetCouponPromoMutation,
  useCreateNewOrderMutation,
} = camerasApi;
