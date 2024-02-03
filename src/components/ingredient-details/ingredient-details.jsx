import styles from "./ingredient-details.module.css";

function IngredientDetails({ cardData }) {
  return (
    <>
      <h4 className={`text text_type_main-large`}> Детали ингредиента</h4>
      <div className="img_container"><img src={cardData.image_large} alt={cardData.name} /></div>
      <h5 className={`text text_type_main-medium`}>{cardData.name}</h5>
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

export default IngredientDetails;
