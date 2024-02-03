import CheckMarkIcon from "../../images/done.svg";
import styles from './order-details.module.css'

function OrderDetails() {
  return (
    <>
      <span className="text text_type_digits-large">034536</span>
      <p>идентификатор заказа</p>
      <img src={CheckMarkIcon} />
      <p>Ваш заказ начали готовить</p>
      <p>Дождитесь готовности на орбитальной станции</p>
    </>
  );
}

export default OrderDetails;
