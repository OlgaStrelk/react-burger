import Price from "../price/price";
import styles from "./order-details.module.css";
import { useSelector } from "../../services/types/hooks";
import Preloader from "../preloader/preloader";
function OrderDetails() {
  const order = useSelector((store) => store.order.order);
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  if (!order || !ingredients) {
    return <Preloader />;
  }

  const statusText = order.status == "done" ? "Выполнен" : "";
  const ingredientsArray = order.ingredients.map((id) => {
    return ingredients.find((ingredient) => {
      return ingredient._id === id;
    });
  });

  const ingredientsMarkup = ingredientsArray.map((ingredient) => {
    if (ingredient) {
      return (
        <li className={styles.ingredient}>
          <div className={styles.flexbox}>
            <img className={styles.img} src={ingredient.image} />
            <h3 className={styles.name}>{ingredient.name}</h3>
          </div>
          <Price number={ingredient.price} />
        </li>
      );
    }
  });

  return (
    <div className={styles.container}>
      <span className={styles.number}>{`#${order.number}`}</span>
      <h1 className={styles.title}>{order.name}</h1>
      <p className={styles.status}>{statusText}</p>
      <h2 className={styles.subtitle}>Состав:</h2>
      <ul className={styles.list}>{ingredientsMarkup}</ul>
      <div className={styles.paragraph}>
        <span className={styles.date}>Вчера, 13:50</span>
        <Price number={32732} />
      </div>
    </div>
  );
}

export default OrderDetails;
