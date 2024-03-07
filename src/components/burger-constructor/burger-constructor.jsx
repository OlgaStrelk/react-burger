import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { SortableIngredient } from "./sortable-ingredient/sortable-ingredient.jsx";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import Total from "./total/total";
import { makeOrder } from "../../services/actions/ingredients.js";
function BurgerConstructor({ handler, onDropHandler }) {
  const { ingredients, buns } = useSelector(
    (state) => state.burgerConstructor.addedIngredients
  );
  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: "ingredients",
    drop(item) {
      onDropHandler(item);
    },
  });

  const orderList = () => {
    let ingredientsIds = ingredients.map((item) => item._id);
    ingredientsIds.push(buns._id, buns._id);

    return {ingredients: ingredientsIds};
  };

  const handleSubmit = (e) => {
    handler();
    dispatch(makeOrder(orderList()));
  };

  const renderInnerIngredients = () => {
    return ingredients?.map((item, index) => (
      <SortableIngredient key={item.id} index={index} data={item} />
    ));
  };

  const renderBun = (style, type) => {
    if (buns) {
      return (
        <div className={`ml-8 mr-2 ${style}`}>
          <ConstructorElement
            type={type}
            isLocked={true}
            text={buns.name}
            price={buns.price}
            thumbnail={buns.image}
          />
        </div>
      );
    } else {
      return (
        <div className={`ml-8 mr-2 ${style}`}>
          <ConstructorElement type={type} text="Выберите булки" />
        </div>
      );
    }
  };

  return (
    <section className={`${styles.section} mt-25 ml-10`}>
      <div className="ml-8" ref={dropRef}>
        {renderBun(" mb-2 pr-1", "top")}
        <ul className={`${styles.container}  ${styles.column} custom-scroll`}>
          {renderInnerIngredients()}
        </ul>
        {renderBun("mt-2", "bottom")}
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
  handler: PropTypes.func,
};

export default BurgerConstructor;
