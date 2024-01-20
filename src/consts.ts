export const CARDS_PER_PAGE = 9;
export const FOCUSABLE_ELEMENTS_QUERY =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export enum AppRoute {
  Root = '/',
  Product = '/product',
  ProductId = '/product/:id',
  Basket = '/basket',
}
