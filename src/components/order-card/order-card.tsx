import { v4 as uuidv4 } from "uuid";

import styles from "./order-card.module.css";
import { FC, useMemo } from "react";
import Price from "../price/price";
import { useSelector } from "../../services/types/hooks";
import { TIngredient, TWsOrder } from "../../utils/types";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
interface IOrderCardProps {
  order: TWsOrder;
}
const OrderCard: FC<IOrderCardProps> = ({ order }) => {
  const {
    ingredients: ingredientsIds,
    status,
    name,
    createdAt,
    number,
  } = order;
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  let imagesArray: string[] = [];
  ingredientsIds.forEach((id) => {
    let ingredient = ingredients.find((ingredient) => ingredient._id === id);
    if (ingredient) imagesArray.push(ingredient.image);
  });

  const countedIds = ingredientsIds.reduce(
    (acc: { [id: string]: number }, i) => {
      if (acc.hasOwnProperty(i)) {
        acc[i] += 1;
      } else {
        acc[i] = 1;
      }
      return acc;
    },
    {}
  );
  let array: TIngredient[] = [];
  for (let key in countedIds) {
    let ingredient = ingredients.find((ing) => ing._id === key);
    if (ingredient) {
      array.push({
        ...ingredient,
        quantity: ingredient.type === "bun" ? 2 : countedIds[key],
      });
    }
  }

  const isHidden = imagesArray.length > 6;
  const imagesArrayMarkup = imagesArray.map((item, index) => {
    if (index == 0) {
      return isHidden ? (
        <li key={index} className={styles.list_item}>
          <div className={styles.cover}>
            <img className={styles.shadowed_icon} src={item} />
          </div>
          <span className={styles.rest}>{`+${imagesArray.length - 6}`}</span>
        </li>
      ) : (
        <li key={index} className={styles.list_item}>
          <img className={styles.img} src={item} />
        </li>
      );
    }
    if (index >= 1 && index < 6) {
      return (
        <li key={index} className={styles.list_item}>
          <img className={styles.img} src={item} />
        </li>
      );
    }
  });


 const countTotal = 
  useMemo(() => {
    const initialValue = 0;
    if (!array) {
      return 0;
    } else {
      const total = array.reduce(
        (
          accumulator: number,
          currentValue: { price: number; quantity: number }
        ) => accumulator + currentValue.price * currentValue.quantity,
        initialValue
      );

      return total;
    }
  }, [array]);


  return (
    <div className={styles.overlay}>
      <p className={styles.paragraph}>
        <span className={styles.number}>{`#${number}`}</span>
        <span className={styles.date}>
          <FormattedDate date={new Date(createdAt)} />{" "}
        </span>
      </p>
      <h4 className={styles.title}>{name}</h4>
      <p className={styles.subtitle}>{status}</p>
      <div className={styles.line}>
        <ul className={styles.icons_list}>{imagesArrayMarkup}</ul>
        <Price number={countTotal} />
      </div>
    </div>
  );
};

export default OrderCard;
