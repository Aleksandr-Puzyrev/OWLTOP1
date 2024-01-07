import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import styles from "./ReviewForm.module.css";
import Input from "../Input/Input";
import Rating from "../Rating/Rating";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "@/helpers/api";
import { useState } from "react";


export default function ReviewForm({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps): JSX.Element {
  const {register, control, handleSubmit, formState: { errors }, reset, clearErrors} = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();


  const onSubmit = async (formData: IReviewForm) => {
    try {
      const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError('Что-то пошло не так');
      }
    } catch (e) {
      setIsError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input {...register('name', {required:{ value: true, message: 'Заполните имя'}})} placeholder="Имя" tabIndex={isOpened ? 0 : -1} error={errors.name} aria-invalid={errors.name ? true : false}/>
        <Input {...register('title', {required:{ value: true, message: 'Заполните заголовок'}})} placeholder="Заголовок отзыва" tabIndex={isOpened ? 0 : -1} className={styles.title} error={errors.title} aria-invalid={errors.title ? true : false}/>
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller rules={{required:{ value: true, message: 'Укажите рейтинг'}}} control={control} name="rating" render={({field}) => (
          <Rating isEditable rating={+field.value} ref={field.ref} tabIndex={isOpened ? 0 : -1} setRating={field.onChange} error={errors.rating}/>
          )}/>
        </div>
        <Textarea {...register('description', {required:{ value: true, message: 'Заполните описание'}})} placeholder="Текст отзыва" tabIndex={isOpened ? 0 : -1} className={styles.description} error={errors.description} aria-label="Текст отзыва" aria-invalid={errors.description ? true : false}/>
        <div className={styles.submit}>
          <Button appearance="primary" tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && <div className={cn(styles.success, styles.panel)} role="alert">
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будетопубликован после проверки.</div>
        <button 
        onClick={() => setIsSuccess(false)} 
        className={styles.close}
        aria-label="Закрыть оповещение"
        >
          <CloseIcon/>
        </button>
      </div>}
      {isError && <div className={cn(styles.error, styles.panel)} role="alert">
        Что-то пошло не так, попробуйте обновить страницу
        <button 
        className={styles.close}
        onClick={() => setIsError(undefined)}
        aria-label="Закрыть оповещение"
        >
        <CloseIcon/>
        </button>
      </div>}
    </form>
  );
}
