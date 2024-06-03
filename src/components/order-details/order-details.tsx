import Price from "../price/price";
import styles from "./order-details.module.css";
function OrderDetails() {
  return (
    <div className={styles.container}>
      <span className={styles.number}>#034533</span>
      <h1 className={styles.title}>Black Hole Singularity острый бургер</h1>
      <p className={styles.status}>Выполнен</p>
      <h2 className={styles.subtitle}>Состав:</h2>
      <ul className={styles.list}>
        <li className={styles.ingredient}>
          <div>
            <img className={styles.img} />
            <h3 className={styles.name}>Флюоресцентная булка R2-D3</h3>
          </div>
          <Price number={73842} />
        </li>
        <li className={styles.ingredient}>
          <div>
            <img className={styles.img} />
            <h3 className={styles.name}>Флюоресцентная булка R2-D3</h3>
          </div>
          <Price number={73842} />
        </li>
        <li className={styles.ingredient}>
          <div>
            <img className={styles.img} />
            <h3 className={styles.name}>Флюоресцентная булка R2-D3</h3>
          </div>
          <Price number={73842} />
        </li>
        <li className={styles.ingredient}>
          <div>
            <img className={styles.img} />
            <h3 className={styles.name}>Флюоресцентная булка R2-D3</h3>
          </div>
          <Price number={73842} />
        </li>
      </ul>
      <div className={styles.paragraph}>
        <span className={styles.date}>Вчера, 13:50</span>
        <Price number={32732} />
      </div>
    </div>
  );
}

export default OrderDetails;