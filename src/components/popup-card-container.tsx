import { useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import classNames from 'classnames';
import { useAppSelector } from '../hooks';

type PopupContainerProps = {
  isActive: boolean;
  onClick: () => void;
  children: JSX.Element | null;
  cardId?: number;
}

export default function PopupCardContainerComponent({ isActive, onClick, cardId = 0, children }: PopupContainerProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const productsInBasket = useAppSelector((state) => state.basket.basketProducts);

  useEffect(() => {
    document.body.classList.toggle('scroll-lock', isActive);

    const isInBasket = productsInBasket.some((product) => product.id === cardId);

    modalRef.current?.classList.toggle('modal--narrow', isInBasket);

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [isActive, onClick, productsInBasket, cardId]);

  return (
    <FocusLock disabled={!isActive} returnFocus>
      <div className={classNames('modal', { 'is-active': isActive })} ref={modalRef}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={() => onClick()} />
          <div className="modal__content">
            {children}
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={() => onClick()}
            >
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}
