import { useEffect } from "react";
import OrderCard from "../components/order-card/order-card";
import { connect, disconnect } from "../services/actions/ws-profile-orders";
import { useAppDispatch, useSelector } from "../services/types/hooks";
import styles from "./orders-history.module.css";
import { Link, useLocation } from "react-router-dom";
import { WSWithToken } from "../utils/consts";

function OrdersHistoryPage() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { orders, status } = useSelector((state) => state.wsProfileOrders);
  console.log(status);
  const connectLiveProfileOrders = () => dispatch(connect(WSWithToken));
  const disconnectLiveProfileOrders = () => dispatch(disconnect());

  useEffect(() => {
    connectLiveProfileOrders();
    return () => {
      disconnectLiveProfileOrders();
    };
  }, []);
  const ordersHistoryMarkup = orders?.map((order) => (
    <li className={styles.item} key={order.number}>
      <Link
        className={styles.link}
        to={String(order.number)}
        state={{ backgroundLocation: location }}
      >
        <OrderCard order={order} />
      </Link>
    </li>
  ));
  return (
    orders && (
      <div className={styles.wrap}>
        <ul className={styles.list}>{ordersHistoryMarkup}</ul>
      </div>
    )
  );
}

export default OrdersHistoryPage;
