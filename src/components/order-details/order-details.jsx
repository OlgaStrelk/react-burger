import CheckMarkIcon from "../../images/done.svg";
import styles from './order-details.module.css'

function OrderDetails() {
  return (
    <div className="mt-20 mb-15">
      <span className={styles.digits}>034536</span>
      <p className={styles.description}>идентификатор заказа</p>
      <img src={CheckMarkIcon} />
      <p className={styles.paragraph}>Ваш заказ начали готовить</p>
      <p className={styles.paragraph_inactive}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;
