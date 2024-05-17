import CurrencyIconPath from "../../images/cur-icon.svg";
import styles from "./card-order.module.css";

const CardOrder = () => {
  return (
    <div className={styles.overlay}>
      <>
        <span>#034535</span>
        <p>Сегодня, 16:20</p>
      </>
      <h4>Death Star Starship Main бургер</h4>
      <ul>
        <li>
          <img />
        </li>
      </ul>
      <>
        <span className="mr-1 text text_type_digits-small"></span>
        <img className="mr-10" src={CurrencyIconPath} alt="у.е." />
      </>
    </div>
  );
};

export default CardOrder;
