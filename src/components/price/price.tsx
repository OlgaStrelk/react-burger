import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price.module.css";
import { FC } from "react";
interface IPriceProps {
  number: number;
  quantity?: number;
}
const Price: FC<IPriceProps> = ({ number, quantity }) => {
  const price = quantity ? `${quantity} x  ${number}` : number;
  return (
    <div className={styles.total}>
      <span className="mr-1 text text_type_digits-default">{price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};
export default Price;
