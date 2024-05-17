import CardOrder from "../components/card-order/card-order";
import styles from "./base-form.module.css";

function OrdersListPage() {
  return (
    <>
      <h1>ЛЕНТА ЗАКАЗОВ</h1>
      <main className={styles.main}>
        <section>
          <CardOrder />
        </section>
        <section></section>
      </main>
    </>
  );
}

export default OrdersListPage;
