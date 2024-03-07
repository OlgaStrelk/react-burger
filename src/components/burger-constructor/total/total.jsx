import { useSelector } from "react-redux";
import CurrencyIconPath from "../../../images/cur-icon.svg";
import styles from "./total.module.css";
import { useMemo } from "react";

function Total(props) {
  const addedIngredients = useSelector(
    (store) => store.burgerConstructor.addedIngredients
  );


  const countTotal = () =>
    useMemo(() => {
      const initialValue = 0;
      if (!(addedIngredients.ingredients && addedIngredients.buns)) {
        return 0;
      } else {
        const total =
          addedIngredients.ingredients.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price,
            initialValue
          ) +
          addedIngredients?.buns?.price * 2;

        return total;
      }
    }, [addedIngredients?.ingredients, addedIngredients?.buns]);
  return (
    <>
      <span className="mr-1 text text_type_digits-medium">{countTotal()}</span>
      <img className="mr-10" src={CurrencyIconPath} alt="у.е." />
    </>
  );
}

export default Total;
