import Price from "../price/price";
import styles from "./order-details.module.css";
import { useAppDispatch, useSelector } from "../../services/types/hooks";
import Preloader from "../preloader/preloader";
import { useEffect, useMemo } from "react";
import { getOrder } from "../../services/actions/order";
import { useParams } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderDetails() {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrder(String(number)));
  }, []);
  const order = useSelector((store) => store.order.order);

  const ingredientsMarkup = order?.ingredients.map((ingredient) => {
    if (ingredient) {
      return (
        <li key={ingredient._id} className={styles.ingredient}>
          <div className={styles.flexbox}>
            <div className={styles.img_wrap}><img className={styles.img} src={ingredient.image} /></div>
            <h3 className={styles.name}>{ingredient.name}</h3>
          </div>
          <Price quantity={ingredient.quantity} number={ingredient.price} />
        </li>
      );
    }
  });
  const memoKey = order?.ingredients.reduce((memo, item) => {
    return memo + item._id;
  }, "");
  const countTotal = useMemo(() => {
    const initialValue = 0;
    if (!order || order?.ingredients.length == 0) {
      return 0;
    } else {
      const total = order?.ingredients.reduce(
        (
          accumulator: number,
          currentValue: { price: number; quantity: number }
        ) => accumulator + currentValue.price * currentValue.quantity,
        initialValue
      );

      return total;
    }
  }, [memoKey]);
  return order ? (
    <div className={styles.container}>
      <span className={styles.number}>{`#${order.number}`}</span>
      <h1 className={styles.title}>{order.name}</h1>
      <p className={styles.status}>{order.status}</p>
      <h2 className={styles.subtitle}>Состав:</h2>
      <ul className={styles.list}>{ingredientsMarkup}</ul>
      <div className={styles.paragraph}>
        <span className={styles.date}>
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
        <Price number={countTotal} />
      </div>
    </div>
  ) : (
    <Preloader />
  );
}

export default OrderDetails;
