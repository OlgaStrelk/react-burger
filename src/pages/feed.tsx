import styles from "./feed.module.css";
import OrdersPanel from "../components/orders-panel/orders-panel";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useSelector } from "../services/types/hooks";
import { WSURL } from "../utils/consts";
import { connect, disconnect } from "../services/actions/ws-feed";
import OrderCard from "../components/order-card/order-card";

function FeedPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { orders, status } = useSelector((state) => state.wsFeed);
  const connectLiveFeed = () => dispatch(connect(WSURL));
  const disconnectLiveFeed = () => dispatch(disconnect());

  useEffect(() => {
    connectLiveFeed();
    return () => {
      disconnectLiveFeed();
    };
  }, []);
  console.log(status);
  const orderCardsMarkup = orders.map((order) => (
    <Link
      key={order.number}
      className={styles.link}
      state={{ backgroundLocation: location }}
      to={String(order.number)}
    >
      <OrderCard order={order} />
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
