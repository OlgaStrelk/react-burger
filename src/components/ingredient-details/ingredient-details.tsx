import { useSelector } from "../../services/types/hooks";
import styles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
interface IngredientDetailsProps {
  style?: string;
}
function IngredientDetails({ style }: IngredientDetailsProps) {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const { id } = useParams();

  const ingredientData = ingredients.find((item: { _id: string }) => {
    return id === item._id;
  });

  const LIST_DATA = [
    { id: 1, title: "Калории,ккал", data: ingredientData?.calories },
    { id: 2, title: "Белки, г", data: ingredientData?.proteins },
    { id: 3, title: "Жиры, г", data: ingredientData?.fat },
    { id: 4, title: "Углеводы, г", data: ingredientData?.carbohydrates },
  ];
  const renderListItemsMarkup = () => {
    return LIST_DATA.map(({ id, title, data }) => (
      <li key={id} className={styles.item}>
        <p>{title}</p>
        <p className={styles.centered}>{data}</p>
      </li>
    ));
  };

  const titleClassName = style
    ? styles.title + " " + style
    : styles.title + " " + styles.title_modal;

  const subtitleClassName = style
    ? styles.subtitle + " " + style
    : styles.subtitle;
  return (
    <>
      {ingredientData ? (
        <>
          <h4 className={titleClassName}> Детали ингредиента</h4>
          <div className={styles.img_container}>
            <img src={ingredientData?.image_large} alt={ingredientData?.name} />
          </div>
          <h5 className={subtitleClassName}>{ingredientData?.name}</h5>
          <ul className={styles.list}>{renderListItemsMarkup()}</ul>
        </>
      ) : (
        <div className={`${styles.container} mt-20`}>
          <h4 className={styles.subtitle_centered}>Ингредиент не найден</h4>
        </div>
      )}
    </>
  );
}

export default IngredientDetails;
