import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useCreateNewReviewMutation } from '../../redux/camerasApi';
import type { ReviewForm } from '../../types/review-form.type';
import type { NewReview } from '../../types/new-review.type';
import { useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { toast } from 'react-toastify';

type FormPopupProps = {
  isActive: boolean;
  onClick: () => void;
}

export default function FormPopupComponent({ isActive, onClick }: FormPopupProps) {
  const { id: productId } = useParams();
  const [isFormSubmitted, setSubmitted] = useState(false);
  const [createReview] = useCreateNewReviewMutation();

  const { handleSubmit, register, formState: { errors, isSubmitting }, watch, reset } = useForm<ReviewForm>();

  const onSubmit: SubmitHandler<ReviewForm> = async (data) => {
    const reviewData: NewReview = {
      cameraId: Number(productId as string),
      advantage: data['user-plus'],
      disadvantage: data['user-minus'],
      rating: Number(data.rate),
      review: data['user-comment'],
      userName: data['user-name']
    };

    await createReview(reviewData)
      .unwrap()
      .then(() => {
        setSubmitted(true);
        reset();
      })
      .catch((err: FetchBaseQueryError) => toast.error(err.status));

  };

  useEffect(() => {
    if (!isActive) {
      setTimeout(() => {
        reset();
        setSubmitted(false);
      }, 500);
    }

  }, [isActive, reset]);

  return (
    !isFormSubmitted ?
      <>
        <p className="title title--h4">Оставить отзыв</p>
        <div className="form-review">
          <form method="post" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
            <div className="form-review__rate">
              <fieldset className={classNames('rate form-review__item', { 'is-invalid': errors['rate'] })}>
                <legend className="rate__caption">
                  Рейтинг
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </legend>
                <div className="rate__bar">
                  <div className="rate__group">
                    <input
                      className="visually-hidden"
                      id="star-5"
                      type="radio"
                      value='5'
                      {...register('rate', {
                        required: true,
                      })}
                    />
                    <label className="rate__label" htmlFor="star-5" title="Отлично" />
                    <input
                      className="visually-hidden"
                      id="star-4"
                      type="radio"
                      value='4'
                      {...register('rate', {
                        required: true,
                      })}
                    />
                    <label className="rate__label" htmlFor="star-4" title="Хорошо" />
                    <input
                      className="visually-hidden"
                      id="star-3"
                      type="radio"
                      value='3'
                      {...register('rate', {
                        required: true,
                      })}
                    />
                    <label className="rate__label" htmlFor="star-3" title="Нормально" />
                    <input
                      className="visually-hidden"
                      id="star-2"
                      type="radio"
                      value='2'
                      {...register('rate', {
                        required: true,
                      })}
                    />
                    <label className="rate__label" htmlFor="star-2" title="Плохо" />
                    <input
                      className="visually-hidden"
                      id="star-1"
                      type="radio"
                      value='1'
                      {...register('rate', {
                        required: true,
                      })}
                    />
                    <label className="rate__label" htmlFor="star-1" title="Ужасно" />
                  </div>
                  <div className="rate__progress">
                    <span className="rate__stars">{watch('rate') || 0}</span> <span>/</span>
                    <span className="rate__all-stars">5</span>
                  </div>
                </div>
                {errors.rate && <p className="rate__message">Нужно оценить товар</p>}
              </fieldset>
              <div className={classNames('custom-input form-review__item', { 'is-invalid': errors['user-name'] })}>
                <label>
                  <span className="custom-input__label">
                    Ваше имя
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Введите ваше имя"
                    {...register('user-name', {
                      required: 'Нужно указать имя',
                      minLength: 2,
                      maxLength: 15
                    })}
                  />
                </label>
                {errors['user-name'] && <p className="custom-input__error">Имя от 2 до 15 символов</p>}
              </div>
              <div className={classNames('custom-input form-review__item', { 'is-invalid': errors['user-plus'] })}>
                <label>
                  <span className="custom-input__label">
                    Достоинства
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Основные преимущества товара"
                    {...register('user-plus', {
                      required: true,
                      minLength: 10,
                      maxLength: 160
                    })}
                  />
                </label>
                {errors['user-plus'] && <p className="custom-input__error">Количество символов от 10 до 160</p>}
              </div>
              <div className={classNames('custom-input form-review__item', { 'is-invalid': errors['user-minus'] })}>
                <label>
                  <span className="custom-input__label">
                    Недостатки
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Главные недостатки товара"
                    {...register('user-minus', {
                      required: true,
                      minLength: 10,
                      maxLength: 160
                    })}
                  />
                </label>
                {errors['user-minus'] && <p className="custom-input__error">Количество символов от 10 до 160</p>}
              </div>
              <div className={classNames('custom-textarea form-review__item', { 'is-invalid': errors['user-comment'] })}>
                <label>
                  <span className="custom-textarea__label">
                    Комментарий
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <textarea
                    placeholder="Поделитесь своим опытом покупки"
                    defaultValue=''
                    {...register('user-comment', {
                      required: true,
                      minLength: 10,
                      maxLength: 160
                    })}
                  />
                </label>
                {errors['user-comment'] && <div className="custom-textarea__error">Количество символов от 10 до 160</div>}
              </div>
            </div>
            <button className="btn btn--purple form-review__btn" type="submit" disabled={isSubmitting}>
              Отправить отзыв
            </button>
          </form >
        </div >
      </>
      :
      <>
        <p className="title title--h4">Спасибо за отзыв</p>
        <svg className="modal__icon" width="80" height="78" aria-hidden="true">
          <use xlinkHref="#icon-review-success"></use>
        </svg>
        <div className="modal__buttons">
          <button onClick={onClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
          </button>
        </div>
      </>
  );
}
