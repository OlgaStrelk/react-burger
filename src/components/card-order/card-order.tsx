import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/types/hooks";
import styles from "./card-order.module.css";

const CardOrder = () => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const imagesArrayMarkup = [...ingredients].map((item, index) => {
    if (index < 6) {
      return (
        <li key={item._id} className={styles.list_item}>
          <img className={styles.img} src={item.image} />
        </li>
      );
    }
  });
  return (
    <div className={styles.overlay}>
      <p className={styles.paragraph}>
        <span className={styles.number}>#034535</span>
        <span className={styles.date}>Сегодня, 16:20 </span>
      </p>
      <h4 className={styles.title}>Death Star Starship Main бургер</h4>
      <div className={styles.paragraph}>
        <ul className={styles.icons_list}>{imagesArrayMarkup}</ul>
        <div>
          <span className="mr-1 text text_type_digits-default">560</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default CardOrder;
