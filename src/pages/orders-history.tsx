import styles from "./orders-history.module.css";
import CardOrder from "../components/card-order/card-order";
import { Link } from "react-router-dom";

function OrdersHistoryPage() {
  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.link} to={":id"}>
            <CardOrder />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={":id"}>
            <CardOrder />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={":id"}>
            <CardOrder />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={":id"}>
            <CardOrder />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={":id"}>
            <CardOrder />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={":id"}>
            <CardOrder />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default OrdersHistoryPage;
