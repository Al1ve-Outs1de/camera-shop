export const SERVER_BASE_URL =
  'https://camera-shop.accelerator.htmlacademy.pro';
export const CARDS_PER_PAGE = 9;
export const NETWORK_ERROR_MESSAGE = 'Some error occured, please, try again';

export const CardActiveTab = {
  Description: 'description',
  Characteristics: 'characteristics',
};

export const SortingActiveType = {
  ByPrice: 'sortPrice',
  ByPopular: 'sortPopular',
};

export const SortingActiveOrder = {
  ToUp: 'up',
  ToDown: 'down',
};

export enum AppRoute {
  Root = '/',
  Product = '/product',
  ProductId = '/product/:id',
  Basket = '/basket',
  Error = '/error',
}
