import CurrencyIconPath from "../../images/cur-icon.svg";
import styles from "./total.module.css";
// import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
function Total(props) {
  return (
    <>
      <span className="mr-1 text text_type_digits-medium">610</span>
      <img className="mr-10"src={CurrencyIconPath} alt="у.е." />
    </>
  );
}

export default Total;
