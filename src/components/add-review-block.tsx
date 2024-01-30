import { memo } from 'react';
import FormPopupComponent from './form-popup';
import ModalLayoutComponent from './modal-layout';
import { useModal } from '../hooks/useModal';

function AddReviewBlockComponent() {
  const [isModalActive, toggleActive] = useModal();

  return (
    <>
      <div className="page-content__headed">
        <h2 className="title title--h3">Отзывы</h2>
        <button className="btn" type="button" onClick={toggleActive}>
          Оставить свой отзыв
        </button>
      </div>
      <ModalLayoutComponent isActive={isModalActive} onClick={toggleActive}>
        <FormPopupComponent isActive={isModalActive} />
      </ModalLayoutComponent>
    </>
  );
}

const memoAddReviewBlock = memo(AddReviewBlockComponent);

export default memoAddReviewBlock;
