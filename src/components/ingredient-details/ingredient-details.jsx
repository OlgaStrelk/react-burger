import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { cardDataShape } from "../../utils/shapes";

function IngredientDetails({ cardData }) {
  return (
    <>
      <h4 className={styles.title}> Детали ингредиента</h4>
      <div className={styles.img_container}><img src={cardData.image_large} alt={cardData.name} /></div>
      <h5 className={`text text_type_main-medium mt-4 mb-8`}>{cardData.name}</h5>
      <ul className={`${styles.list}`}>
        <li className={`${styles.item}`}>
          <p>Калории,ккал</p>
          <p>{cardData.calories}</p>
        </li>
        <li className={`${styles.item}`}>
          <p>Белки, г</p>
          <p>{cardData.proteins}</p>
        </li>
        <li className={`${styles.item}`}>
          <p>Жиры, г</p>
          <p>{cardData.fat}</p>
        </li>
        <li className={`${styles.item}`}>
          <p>Углеводы, г</p>
          <p>{cardData.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  cardData: PropTypes.shape(cardDataShape).isRequired,
};

export default IngredientDetails;
