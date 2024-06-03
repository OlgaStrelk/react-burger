import { useSelector } from "../../services/types/hooks";
import styles from "./card-order.module.css";
import { useEffect, useState } from "react";
import Price from "../price/price";

const OrderCard = () => {
  const [counter, setCounter] = useState(0);
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const imagesArrayMarkup = [...ingredients].map((item, index) => {
    if (index == 0) {
      return (
        <li key={item._id} className={styles.list_item}>
          <div className={styles.cover}>
            <img className={styles.shadowed_icon} src={item.image} />
          </div>
          <span className={styles.rest}>{`+${counter}`}</span>
        </li>
      );
    }
    if (index >= 1 && index < 6) {
      return (
        <li key={item._id} className={styles.list_item}>
          <img className={styles.img} src={item.image} />
        </li>
      );
    }
  });

  useEffect(() => {
    if (ingredients.length > 6) {
      setCounter(ingredients.length - 6);
    }
  });

  return (
    <div className={styles.overlay}>
      <p className={styles.paragraph}>
        <span className={styles.number}>#034535</span>
        <span className={styles.date}>Сегодня, 16:20 </span>
      </p>
      <h4 className={styles.title}>Death Star Starship Main бургер</h4>
      <div className={styles.line}>
        <ul className={styles.icons_list}>{imagesArrayMarkup}</ul>
        <Price number={74382} />
      </div>
    </div>
  );
};

export default OrderCard;
