import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CatalogPage from '../../pages/catalog/catalog';
import { AppRoute } from '../../consts';
import Layout from '../layout/layout';
import ProductPage from '../../pages/product/product';
import BasketPage from '../../pages/basket/basket';
import ErrorPage from '../../pages/error/error';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<CatalogPage />} />
          <Route path={AppRoute.ProductId} element={<ProductPage />} />
          <Route path={AppRoute.Basket} element={<BasketPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
