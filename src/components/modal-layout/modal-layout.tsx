import { RefObject, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import classNames from 'classnames';

type ModalLayoutProps = {
  onClick: () => void;
  isActive: boolean;
  children: JSX.Element;
  modalRef?: RefObject<HTMLDivElement>;
}

export default function ModalLayoutComponent({ isActive, onClick, modalRef, children }: ModalLayoutProps) {
  useEffect(() => {

    document.body.classList.toggle('scroll-lock', isActive);

    function handleDocumentEscKeydown(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        onClick();
      }
    }

    if (isActive) {
      document.addEventListener('keydown', handleDocumentEscKeydown);
    } else {
      document.removeEventListener('keydown', handleDocumentEscKeydown);
    }

    return () => {
      document.removeEventListener('keydown', handleDocumentEscKeydown);
      document.body.classList.remove('scroll-lock');
    };

  }, [isActive, onClick]);

  return (
    <FocusLock disabled={!isActive} returnFocus>
      <div className={classNames('modal', { 'is-active': isActive })} ref={modalRef} data-testid='modal-block'>
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
