import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { SortableIngredient } from "./sortable-ingredient/sortable-ingredient.tsx";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import Total from "./total/total.tsx";
import {
  makeOrder,
  addIngredient,
  INCREASE_INGREDIENT_QUANTITY,
} from "../../services/actions/ingredients.ts";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/consts.ts";
import { TConstructorIngredient, TIngredient } from "../../utils/types.ts";

export interface IBurgerConstructorProps {
  onModalOpen: () => void;
}
function BurgerConstructor({ onModalOpen }: IBurgerConstructorProps) {
  const [isButtonActive, setButtonActive] = useState(false);
  const [isNavigated, setNavigated] = useState(false);

  const { ingredients, buns } = useSelector(
    // @ts-ignore
    (state) => state.burgerConstructor.addedIngredients
  );
  // @ts-ignore
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const validateConstructor = () => {
    if (!buns || !ingredients.length) {
      // setError("Добавьте ингредиенты в конструктор для заказа");
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  };

  useEffect(() => validateConstructor(), [ingredients, buns]);

  const onDropHandler = (ingredient: TIngredient) => {
    dispatch({ type: INCREASE_INGREDIENT_QUANTITY, payload: ingredient });
    dispatch(addIngredient(ingredient));
  };

  const [, dropRef] = useDrop({
    accept: "ingredients",
    drop(item: TIngredient) {
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

  const handleSubmit = () => {
    let data = orderList();
    if (user && data) {
      onModalOpen();
      // @ts-ignore
      dispatch(makeOrder(data));
      console.log(data)
    } else {
      setNavigated(true);
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
      return ingredients?.map((item: TConstructorIngredient, index:number) => (
        <SortableIngredient key={item.id} index={index} data={item} />
      ));
    }
  };

  type TBunType = 'top'|'bottom'|undefined
  const renderBunMarkup = (style:string, type:TBunType, text:string) => {
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
    <>
      {!isNavigated ? (
        <section className={`${styles.section} mt-25 ml-10`}>
          <div className="ml-8" ref={dropRef}>
            {renderBunMarkup(" mb-2 pr-1", "top", "(верх)")}
            <ul
              className={`${styles.container}  ${styles.column} custom-scroll`}
            >
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
      ) : (
        <Navigate to={PATHS.login} />
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
};

export default BurgerConstructor;
