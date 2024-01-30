import { Link } from 'react-router-dom';
import { AppRoute } from '../consts';

export default function ErrorPage() {
  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}
    >
      <h1 style={{
        fontSize: 40,
      }}
      >
        Page not found
      </h1>
      <Link to={AppRoute.Root} replace className='main-nav__link'>Go to Home page</Link>
    </main>
  );
}
