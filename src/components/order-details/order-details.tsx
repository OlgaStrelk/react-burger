import { useSelector } from "react-redux";
import CheckMarkIcon from "../../images/done.svg";
import styles from "./order-details.module.css";

function OrderDetails() {
  //@ts-ignore
  const isLoading = useSelector((store) => store.order.orderRequest);
  //@ts-ignore
  const orderNumber = useSelector((store) => store.order.order);
  return isLoading ? (
    "Загрузка..."
  ) : (
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
  );
}

export default OrderDetails;
