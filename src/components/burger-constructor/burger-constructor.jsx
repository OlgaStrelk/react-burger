import { useEffect, useState } from "react";
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
import {
  makeOrder,
  addIngredient,
  INCREASE_INGREDIENT_QUANTITY,
} from "../../services/actions/ingredients.js";
function BurgerConstructor({ onModalOpen }) {
  const [isButtonActive, setButtonActive] = useState(false);
  const [isError, setError] = useState("");

  const { ingredients, buns } = useSelector(
    (state) => state.burgerConstructor.addedIngredients
  );

  const dispatch = useDispatch();

  const validateConstructor = () => {
    if (!buns || !ingredients.length) {
      setError("Добавьте ингредиенты в конструктор для заказа");
      setButtonActive(false);
    } else {
      setError("");
      setButtonActive(true);
    }
  };

  useEffect(() => validateConstructor(), [ingredients, buns]);

  const onDropHandler = (ingredient) => {
    dispatch({ type: INCREASE_INGREDIENT_QUANTITY, payload: ingredient });
    dispatch(addIngredient(ingredient));
  };

  const [, dropRef] = useDrop({
    accept: "ingredients",
    drop(item) {
      onDropHandler(item);
    },
  });

  const orderList = () => {
    if (!(ingredients && buns)) {
      return null;
    } else {
      let ingredientsIds = [...ingredients]?.map((item) => item._id);
      ingredientsIds.push(buns?._id, buns?._id);
      return { ingredients: ingredientsIds };
    }
  };

  const handleSubmit = (e) => {
    onModalOpen();
    let data = orderList();
    if (data) {
      dispatch(makeOrder(data));
    } else {
      return setError("Выберите ингредиенты");
    }
  };

  const renderInnerIngredientsMarkup = () => {
    if (!ingredients.length) {
      return (
        <li className={styles.stub}>
          <div className="constructor-element 1 ml-8">
            <span className="constructor-element__row">
              <span className="constructor-element__text">
                Выберите начинку
              </span>
            </span>
          </div>
        </li>
      );
    } else {
      return ingredients?.map((item, index) => (
        <SortableIngredient key={item.id} index={index} data={item} />
      ));
    }
  };

  const renderBunMarkup = (style, type, text) => {
    if (buns) {
      return (
        <div className={`ml-8 mr-2 ${style}`}>
          <ConstructorElement
            type={type}
            isLocked={true}
            text={`${buns.name} ${text}`}
            price={buns.price}
            thumbnail={buns.image}
          />
        </div>
      );
    } else {
      return (
        <div className={`ml-8 mr-2 ${style} ${styles.stub}`}>
          <div
            className={`constructor-element constructor-element_pos_${type}`}
          >
            <span className="constructor-element__row">
              <span className="constructor-element__text">Выберите булки</span>
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <section className={`${styles.section} mt-25 ml-10`}>
      <div className="ml-8" ref={dropRef}>
        {renderBunMarkup(" mb-2 pr-1", "top", "(верх)")}
        <ul className={`${styles.container}  ${styles.column} custom-scroll`}>
          {renderInnerIngredientsMarkup()}
        </ul>
        {renderBunMarkup("mt-2", "bottom", "(низ)")}
      </div>
      <div className={`mt-10 ${styles.total}`}>
        <Total />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleSubmit}
          disabled={!isButtonActive}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
};

export default BurgerConstructor;
