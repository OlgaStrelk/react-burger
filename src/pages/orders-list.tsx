import CardOrder from "../components/card-order/card-order";
import styles from "./orders-list.module.css";
import OrdersPanel from "../components/orders-panel/orders-panel";

function OrdersListPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Лента заказов</h1>

      <div className={styles.container}>
        <section className={styles.section}>
          <CardOrder /> <CardOrder />
          <CardOrder />
          <CardOrder />
          <CardOrder />
          <CardOrder />
        </section>
        <OrdersPanel />
      </div>
    </main>
  );
}

export default OrdersListPage;
