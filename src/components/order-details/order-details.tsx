import { v4 as uuidv4 } from "uuid";
import Price from "../price/price";
import styles from "./order-details.module.css";
import { useAppDispatch, useSelector } from "../../services/types/hooks";
import Preloader from "../preloader/preloader";
import { useEffect, useMemo } from "react";
import { getOrder } from "../../services/actions/order";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrder(String(number)));
  }, []);
  const order = useSelector((store) => store.order.order);

  if (!order) {
    return <Preloader />;
  }

  const ingredientsMarkup = order.ingredients.map((ingredient) => {
    if (ingredient) {
      return (
        <li key={ingredient._id} className={styles.ingredient}>
          <div className={styles.flexbox}>
            <img className={styles.img} src={ingredient.image} />
            <h3 className={styles.name}>{ingredient.name}</h3>
          </div>
          <Price quantity={ingredient.quantity} number={ingredient.price} />
        </li>
      );
    }
  });

  // const countTotal = (): number =>
  //   useMemo(() => {
  //     const initialValue = 0;
  //     if (order.ingredients.length == 0) {
  //       return 0;
  //     } else {
  //       const total = order.ingredients.reduce(
  //         (
  //           accumulator: number,
  //           currentValue: { price: number; quantity: number }
  //         ) => accumulator + currentValue.price * currentValue.quantity,
  //         initialValue
  //       );

  //       return total;
  //     }
  //   }, [order.ingredients]);

  const countTotal = (): number => {
    const initialValue = 0;
    if (order.ingredients.length == 0) {
      return 0;
    } else {
      const total = order.ingredients.reduce(
        (
          accumulator: number,
          currentValue: { price: number; quantity: number }
        ) => accumulator + currentValue.price * currentValue.quantity,
        initialValue
      );

      return total;
    }
  };
  return (
    <div className={styles.container}>
      <span className={styles.number}>{`#${order.number}`}</span>
      <h1 className={styles.title}>{order.name}</h1>
      <p className={styles.status}>{order.status}</p>
      <h2 className={styles.subtitle}>Состав:</h2>
      <ul className={styles.list}>{ingredientsMarkup}</ul>
      <div className={styles.paragraph}>
        <span className={styles.date}>Вчера, 13:50</span>
        {/* <Price number={countTotal()} /> */}
        <Price number={countTotal()} />
      </div>
    </div>
  );
}

export default OrderDetails;
