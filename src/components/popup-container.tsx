import { useEffect, useRef } from 'react';
import { FOCUSABLE_ELEMENTS_QUERY } from '../consts';

type PopupContainerProps = {
  isActive: boolean;
  onClick: () => void;
  children: JSX.Element | null;
}

export default function PopupContainerComponent({ isActive, onClick, children }: PopupContainerProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle('scroll-lock', isActive);

    if (isActive && modalRef.current) {
      const modalElement = modalRef.current;
      const focusableElements = modalElement.querySelectorAll(
        FOCUSABLE_ELEMENTS_QUERY
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      firstElement.focus();

      const handleDocumentKeydown = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          onClick();
        }
      };

      const handleTabKeyPress = (evt: KeyboardEvent) => {
        if (evt.key !== 'Tab') {
          return;
        }

        if (!evt.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          return evt.preventDefault();
        }

        if (evt.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          evt.preventDefault();
        }

      };

      document.addEventListener('keydown', handleDocumentKeydown);
      modalElement.addEventListener('keydown', handleTabKeyPress);
      return () => {
        document.removeEventListener('keydown', handleDocumentKeydown);
        modalElement.removeEventListener('keydown', handleTabKeyPress);
      };
    }

  }, [isActive, onClick]);

  return (
    isActive ?
      <div className='modal is-active' ref={modalRef}>
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
      : null
  );
}
