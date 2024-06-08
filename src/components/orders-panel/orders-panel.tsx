import styles from "./orders-panel.module.css";

function OrdersPanel() {
  return (
    <section className={styles.section}>
      <div className={styles.flex}>
        <div className={styles.ready}>
          <h2 className={styles.title}>Готовы:</h2>
          <ul className={styles.ready}>
            <li className={styles.number}>034533</li>
            <li className={styles.number}>034533</li>
            <li className={styles.number}>034533</li>
            <li className={styles.number}>034533</li>
            <li className={styles.number}>034533</li>
          </ul>
        </div>
        <div >
          <h2 className={styles.title}>В работе:</h2>
          <ul className={styles.progress}>
            <li className={styles.number}>034533</li>
            <li className={styles.number}>034533</li>
            <li className={styles.number}>034533</li>
          </ul>
        </div>
      </div>
      <h2 className={styles.title}>Выполнено за все время:</h2>
      <span className={styles.sum}>28 752</span>
      <h2 className={styles.title}>Выполнено за сегодня:</h2>
      <span className={styles.sum}>138</span>
    </section>
  );
}

export default OrdersPanel;
