import { BarLoader } from 'react-spinners';

export default function LoadingSpinner() {
  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      <BarLoader color='#7575e2' />
    </main>
  );
}
