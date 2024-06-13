import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { SortableIngredient } from "./sortable-ingredient/sortable-ingredient.tsx";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Total from "./total/total.tsx";

import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/consts.ts";
import { TConstructorIngredient } from "../../utils/types.ts";
import { increaseQuantity } from "../../services/actions/ingredients.ts";
import { addIngredient } from "../../services/actions/constructor-ingredients.ts";
import { makeOrder } from "../../services/actions/order.ts";
import { useAppDispatch, useSelector } from "../../services/types/hooks.ts";
import BurgerStub from "../burger-stub/burger-stub.tsx";
import { BUN_STUB_TEXT, FILLING_STUB_TEXT } from "../../utils/text-contents.ts";

export interface IBurgerConstructorProps {
  onModalOpen: () => void;
}

export type TOrderList = { ingredients: string[] } | null;

function BurgerConstructor({ onModalOpen }: IBurgerConstructorProps) {
  const [isButtonActive, setButtonActive] = useState(false);
  const [isNavigated, setNavigated] = useState(false);

  const { ingredients, buns } = useSelector(
    (state) => state.burgerConstructor.addedIngredients
  );
  const user = useSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const validateConstructor = () => {
    if (!buns || !ingredients.length) {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  };

  useEffect(() => validateConstructor(), [ingredients, buns]);

  const onDropHandler = (ingredient: TConstructorIngredient) => {
    dispatch(increaseQuantity(ingredient));
    dispatch(addIngredient(ingredient));
  };

  const [, dropRef] = useDrop({
    accept: "ingredients",
    drop(item: TConstructorIngredient) {
      onDropHandler(item);
    },
  });

  const orderList = (): TOrderList => {
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
      dispatch(makeOrder(data));
    } else {
      setNavigated(true);
    }
  };

  const renderInnerIngredientsMarkup = () => {
    if (!ingredients.length) {
      return (
        <li className={styles.stub}>
          <BurgerStub style={"1 ml-10"} text={BUN_STUB_TEXT} />
        </li>
      );
    } else {
      return ingredients?.map((item: TConstructorIngredient, index: number) => (
        <SortableIngredient key={item.id} index={index} data={item} />
      ));
    }
  };

  type TBunType = "top" | "bottom" | undefined;
  const renderBunMarkup = (style: string, type: TBunType, text: string) => {
    if (buns) {
      return (
        <div className={`${styles.bun} ${style}`}>
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
        <div className={`${style} ${styles.stub}`}>
          <BurgerStub
            text={FILLING_STUB_TEXT}
            style={`constructor-element_pos_${type}`}
          />
        </div>
      );
    }
  };

  return (
    <>
      {!isNavigated ? (
        <section className={styles.section}>
          <div data-cy="ingredients-destination" className="pl-4" ref={dropRef}>
            {renderBunMarkup("ml-10 mb-2", "top", "(верх)")}
            <ul
              className={`${styles.container}  ${styles.column} custom-scroll`}
            >
              {renderInnerIngredientsMarkup()}
            </ul>
            {renderBunMarkup("ml-10 mt-2", "bottom", "(низ)")}
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

export default BurgerConstructor;
