import { memo } from "react";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { cardDataShape } from "../../utils/shapes";
import styles from "./burger-constructor.module.css";
import Total from "./total/Total";
function BurgerConstructor({ ingredientsArray, handler }) {
  const handleSubmit = (e) => {
    handler();
  };

  const img = ingredientsArray[0]?.image;
  const renderInnerIngredients = () => {
    return ingredientsArray?.map((item) => (
      <li key={item._id} className={`${styles.item} mr-3`}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
      </li>
    ));
  };
  return (
    <section className={`${styles.section} mt-25 ml-10`}>
      <div className="ml-8">
        <div className={`${styles.wrapper} ${styles.column} ml-8 mb-2 mr-5 pr-1`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
            className="ml-8"
          />
        </div>
        <ul className={`${styles.container}  ${styles.column} custom-scroll`}>
          {renderInnerIngredients()}
        </ul>
        <div className="ml-8 mr-5 mt-2">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </div>
      </div>
      <div className={`mt-10 ${styles.total}`}>
        <Total />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleSubmit}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredientsArray: PropTypes.arrayOf(PropTypes.shape(cardDataShape)).isRequired,
  handler: PropTypes.func,
};

export default BurgerConstructor;
