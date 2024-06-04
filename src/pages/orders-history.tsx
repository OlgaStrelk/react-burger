import OrderCard from "../components/order-card/order-card";
import styles from "./orders-history.module.css";
import { Link, useLocation } from "react-router-dom";

function OrdersHistoryPage() {
  const location = useLocation();
  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link
            className={styles.link}
            to={"98769"}
            state={{ backgroundLocation: location }}
          >
            <OrderCard />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={"874289"}>
            <OrderCard />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={":number"}>
            <OrderCard />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={":number"}>
            <OrderCard />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={":number"}>
            <OrderCard />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={":number"}>
            <OrderCard />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default OrdersHistoryPage;
