import CurrencyIconPath from '../../../images/cur-icon.svg';
import styles from "./total.module.css";
function Total(props) {
  return (
    <>
      <span className="mr-1 text text_type_digits-medium">610</span>
      <img className="mr-10"src={CurrencyIconPath} alt="у.е." />
    </>
  );
}

export default Total;