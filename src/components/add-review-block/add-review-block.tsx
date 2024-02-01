import { memo } from 'react';
import FormPopupComponent from '../form-popup/form-popup';
import ModalLayoutComponent from '../modal-layout/modal-layout';
import { useModal } from '../../hooks/useModal';

const addReviewBlockComponent = memo(() => {
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
});

addReviewBlockComponent.displayName = 'AddReviewBlock';

export default addReviewBlockComponent;
