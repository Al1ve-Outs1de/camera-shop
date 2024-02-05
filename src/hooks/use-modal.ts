import { useState } from 'react';

export function useModal(): [boolean, () => void] {
  const [isModalAcitve, setModalActive] = useState(false);

  const toggleActive = () => setModalActive(!isModalAcitve);

  return [isModalAcitve, toggleActive];
}
