import styles from "./card-modal.module.css";
import Modal from "../modal/Modal";

function CardModal({ cardData }) {
  console.log(cardData);
  return (
    <>
      <Modal>
        <h4 className={`text text_type_main-large`}> Детали ингредиента</h4>
        <img src={cardData.image_large} alt={cardData.name} />
        <h5 className={`text text_type_main-medium`}>{cardData.name}</h5>
        <ul className={`${styles.list}`}>
          <li>
            <p>Калории,ккал</p>
            <p>{cardData.calories}</p>
          </li>
          <li>
            <p>Белки, г</p>
            <p>{cardData.proteins}</p>
          </li>
          <li>
            <p>Жиры, г</p>
            <p>{cardData.fat}</p>
          </li>
          <li>
            <p>Углеводы, г</p>
            <p>{cardData.carbohydrates}</p>
          </li>
        </ul>
      </Modal>
    </>
  );
}

export default CardModal;
