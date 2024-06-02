import styles from "./orders-history.module.css";
import CardOrder from "../components/card-order/card-order";
import { Link } from "react-router-dom";

function OrdersHistoryPage() {
  return (
    <div className={styles.wrap}>
      <Link className={styles.link} to={":id"}>
        <CardOrder />
      </Link>
      <Link className={styles.link} to={":id"}>
        <CardOrder />
      </Link>{" "}
      <Link className={styles.link} to={":id"}>
        <CardOrder />
      </Link>{" "}
      <Link className={styles.link} to={":id"}>
        <CardOrder />
      </Link>{" "}
      <Link className={styles.link} to={":id"}>
        <CardOrder />
      </Link>{" "}
      <Link className={styles.link} to={":id"}>
        <CardOrder />
      </Link>{" "}
      <Link className={styles.link} to={":id"}>
        <CardOrder />
      </Link>
    </div>
  );
}

export default OrdersHistoryPage;
