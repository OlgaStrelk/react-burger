import { useEffect, useState } from "react";
import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { cardDataShape } from "../../utils/shapes";
import { useNavigate, useParams } from "react-router-dom";
import { NotFoundPage } from "../../pages";

function IngredientDetails(props) {
  const [ingredientData, setIngredientData] = useState(null);
  // const cardId = useSelector((store) => store.modal?.currentIngredient);
  const ingredients = useSelector((store) => store.ingredients?.ingredients);
  const { id } = useParams();
  const navigate = useNavigate();

  const getData = (id) => {
    const currentIngredient = ingredients.find((item) => {
      return id === item._id;
    });
    if (currentIngredient) {
      setIngredientData(currentIngredient);
    } else return null;
  };
  useEffect(() => {
    if (ingredients) {
      getData(id);
    }
  }, [ingredients, id]);

  const LIST_DATA = [
    { id: 1, title: "Калории,ккал", data: ingredientData?.calories },
    { id: 2, title: "Белки, г", data: ingredientData?.proteins },
    { id: 3, title: "Жиры, г", data: ingredientData?.fat },
    { id: 4, title: "Углеводы, г", data: ingredientData?.carbohydrates },
  ];
  const renderListItems = () => {
    return LIST_DATA.map(({ id, title, data }) => {
      return (
        <li key={id} className={styles.item}>
          <p>{title}</p>
          <p>{data}</p>
        </li>
      );
    });
  };

  return (
    <>
      {ingredientData ? (
        <>
          <h4 className={styles.title}> Детали ингредиента</h4>
          <div className={styles.img_container}>
            <img src={ingredientData?.image_large} alt={ingredientData?.name} />
          </div>
          <h5 className={styles.subtitle}>{ingredientData?.name}</h5>
          <ul className={styles.list}>{renderListItems()}</ul>
        </>
      ) : (
        <div className={`${styles.container} mt-20`}>
          <h4 className={styles.subtitle_centered}>Ингредиент не найден</h4>
        </div>
      )}
    </>
  );
}

IngredientDetails.propTypes = {
  cardData: PropTypes.shape(cardDataShape),
};

export default IngredientDetails;
