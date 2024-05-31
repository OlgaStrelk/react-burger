import styles from "./orders-history.module.css"
import CardOrder from "../components/card-order/card-order";

function OrdersHistoryPage() {
  return (
    <div className={styles.wrap}>
      <CardOrder />
      <CardOrder />
      <CardOrder />
      <CardOrder />
      <CardOrder />
      <CardOrder />

    </div>
  );
}

export default OrdersHistoryPage;
