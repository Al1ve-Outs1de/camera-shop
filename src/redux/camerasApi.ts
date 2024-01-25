import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Card } from '../types/catalog-card.type';
import type { Promo } from '../types/promo.type';

export const camerasApi = createApi({
  reducerPath: 'cameras',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://camera-shop.accelerator.pages.academy',
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
    getSimilarProducts: builder.query<Card, string>({
      query: (id) => `/cameras/${id}/similar`,
    }),
    getProductReviews: builder.query<Card, string>({
      query: (id) => `/cameras/${id}/reviews`,
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
