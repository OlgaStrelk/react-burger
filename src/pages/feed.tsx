import styles from "./feed.module.css";
import OrdersPanel from "../components/orders-panel/orders-panel";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../services/types";
import { useSelector } from "../services/types/hooks";
import { WSURL } from "../utils/consts";
import { connect, disconnect } from "../services/actions/ws-orders";
import OrderCard from "../components/order-card/order-card";

function FeedPage() {
  const dispatch = useAppDispatch();
  const { orders, status } = useSelector((state) => state.wsFeed);
  const connectLiveOrders = () => dispatch(connect(WSURL));
  const disconnectLiveOrders = () => dispatch(disconnect());
  useEffect(() => {
    connectLiveOrders();
    return () => {
      disconnectLiveOrders();
    };
  }, []);

  const orderCardsMarkup = orders.map((item) => (
    <Link className={styles.link} to={item._id}>
      <OrderCard order={item} />
    </Link>
  ));
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Лента заказов</h1>

      <div className={styles.container}>
        <section className={styles.section}>{orderCardsMarkup}</section>
        <OrdersPanel />
      </div>
    </main>
  );
}

export default FeedPage;
