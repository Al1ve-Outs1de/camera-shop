import { Link } from 'react-router-dom';
import { AppRoute } from '../consts';

export default function ErrorPage() {
  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1>Page not found</h1>
      <Link to={AppRoute.Root} />
    </main>
  )
}
