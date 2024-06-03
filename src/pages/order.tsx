import styles from "./order.module.css";
import OrderDetails from "../components/order-details/order-details";

function OrderPage() {
  return (
    <main className={styles.main}>
      <OrderDetails />
    </main>
  );
}
export default OrderPage;
