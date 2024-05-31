import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";

function OrderPage() {
  return (
    <main>
      <span>#034533</span>
      <h1>Black Hole Singularity острый бургер</h1>
      <h2>Состав:</h2>
      <ul>
        <li className={styles.ingredient}>
          <img /> <h3>Флюоресцентная булка R2-D3</h3>
          <span className="mr-1">2x2000</span>

          {/* <span className="mr-1">{`${quantity}x${price}`}</span> */}
          <CurrencyIcon type="primary" />
        </li>
      </ul>
      <p className={styles.paragraph}>
        <span>Вчера, 13:50</span> <span className="mr-1">873187</span>
        <CurrencyIcon type="primary" />
      </p>
    </main>
  );
}
export default OrderPage;
