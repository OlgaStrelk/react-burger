import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/types/hooks";
import styles from "./card-order.module.css";
import { useEffect, useState } from "react";


const CardOrder = () => {

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
    <div  className={styles.overlay}>
      <p className={styles.paragraph}>
        <span className={styles.number}>#034535</span>
        <span className={styles.date}>Сегодня, 16:20 </span>
      </p>
      <h4 className={styles.title}>Death Star Starship Main бургер</h4>
      <div className={styles.line}>
        <ul className={styles.icons_list}>{imagesArrayMarkup}</ul>
        <div className={styles.total}>
          <span className="mr-1 text text_type_digits-default">560</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default CardOrder;
