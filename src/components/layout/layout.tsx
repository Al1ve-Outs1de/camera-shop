import { Outlet } from 'react-router-dom';
import FooterComponent from '../footer/footer';
import HeaderComponent from '../header/header';

export default function Layout() {
  return (
    <div className="wrapper">
      <HeaderComponent />

      <Outlet />

      <FooterComponent />
    </div>
  );
}
