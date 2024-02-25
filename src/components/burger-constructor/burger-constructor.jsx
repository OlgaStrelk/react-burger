import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import Total from "./total/Total";
function BurgerConstructor({ handler, onDropHandler }) {
  const { ingredients, buns } = useSelector(
    (state) => state.constructorReducer.addedIngredients
  );

  console.log(buns)

  const [, dropRef] = useDrop({
    accept: "ingredients",
    drop(item) {
      onDropHandler(item);
    },
  });
  const handleSubmit = (e) => {
    handler();
  };

  const renderInnerIngredients = () => {
    return ingredients?.map((item) => (
      <li key={item?.id} className={`${styles.item} mr-3`}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={item?.name}
          price={item?.price}
          thumbnail={item?.image}
        />
      </li>
    ));
  };

  return (
    <section className={`${styles.section} mt-25 ml-10`}>
      <div className="ml-8" ref={dropRef}>
        <div
          className={`${styles.wrapper} ${styles.column} ml-8 mb-2 mr-5 pr-1`}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={buns?.name}
            price={buns?.price}
            thumbnail={buns?.image}
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
            text={buns?.name}
            price={buns?.price}
            thumbnail={buns?.image}
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
  handler: PropTypes.func,
};

export default BurgerConstructor;
