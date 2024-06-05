import styles from "./order.module.css";
import OrderDetails from "../components/order-details/order-details";
import { useEffect } from "react";
import { getOrder } from "../services/actions/order";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../services/types/hooks";

function OrderPage() {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrder(String(number)));
  }, []);
  return (
    <main className={styles.main}>
      <OrderDetails />
    </main>
  );
}
export default OrderPage;
