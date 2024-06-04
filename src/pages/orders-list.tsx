import OrderCard from "../components/card-order/card-order";
import styles from "./orders-list.module.css";
import OrdersPanel from "../components/orders-panel/orders-panel";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../services/types";
import { useSelector } from "../services/types/hooks";
import { WSURL } from "../utils/consts";
import { connect } from "../services/actions/ws-orders";

function OrdersListPage() {
  const dispatch = useAppDispatch();
  const { orders, status } = useSelector((state) => state.wsOrders);
  const connectLiveOrders = () => dispatch(connect(WSURL));

  useEffect(() => {
    console.log(orders, status);
    connectLiveOrders();
  }, []);
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Лента заказов</h1>

      <div className={styles.container}>
        <section className={styles.section}>
          <Link className={styles.link} to=":id">
            <OrderCard />
          </Link>
          <Link className={styles.link} to=":id">
            <OrderCard />
          </Link>
          <Link className={styles.link} to=":id">
            <OrderCard />
          </Link>
          <Link className={styles.link} to=":id">
            <OrderCard />
          </Link>
          <Link className={styles.link} to=":id">
            <OrderCard />
          </Link>
          <Link className={styles.link} to=":id">
            <OrderCard />
          </Link>
        </section>
        <OrdersPanel />
      </div>
    </main>
  );
}

export default OrdersListPage;
