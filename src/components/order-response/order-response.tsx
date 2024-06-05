import CheckMarkIcon from "../../images/done.svg";
import styles from "./order-response.module.css";
import Preloader from "../preloader/preloader";
import { useSelector } from "../../services/types/hooks";
import { FETCHING_FAILED_ERROR_TEXT } from "../../utils/errors";

function OrderResponse() {
  const { orderRequest: isLoading, order: orderNumber } = useSelector(
    (store) => store.orderMade
  );

  return isLoading ? (
    <>
      <h2 className={styles.title}>Мы уже начали оформлять ваш заказ</h2>
      <Preloader />
    </>
  ) : orderNumber ? (
    <div className="mt-20 mb-15">
      <div className={styles.wrapper}>
        <span className={styles.digits}>{orderNumber}</span>
      </div>
      <p className={styles.description}>идентификатор заказа</p>
      <img src={CheckMarkIcon} />
      <p className={styles.paragraph}>Ваш заказ начали готовить</p>
      <p className={styles.paragraph_inactive}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  ) : (
    <h3>{FETCHING_FAILED_ERROR_TEXT.order}</h3>
  );
}

export default OrderResponse;
