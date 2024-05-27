import CardOrder from "../components/card-order/card-order";
import styles from "./orders-list.module.css";

function OrdersListPage() {
  return (
    <>
      <h1 className={styles.title}>Лента заказов</h1>
      <main className={styles.main}>
        <section className={styles.section}>
          <CardOrder />
        </section>
        <section className={styles.section}></section>
      </main>
    </>
  );
}

export default OrdersListPage;
