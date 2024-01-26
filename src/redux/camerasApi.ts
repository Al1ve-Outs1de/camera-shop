import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Card } from '../types/catalog-card.type';
import type { Promo } from '../types/promo.type';
import type { Review } from '../types/review.type';

export const camerasApi = createApi({
  reducerPath: 'cameras',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://camera-shop.accelerator.htmlacademy.pro',
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
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetPromosQuery,
  useGetSpecificProductQuery,
  useGetSimilarProductsQuery,
  useGetProductReviewsQuery,
} = camerasApi;
