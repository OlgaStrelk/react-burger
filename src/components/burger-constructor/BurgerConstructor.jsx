import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import Total from "../total/Total";
function BurgerConstructor({ data }) {
  const img = data[0]?.image;
  const renderInnerIngredients = () => {
    return data?.map((item) => (
      <li key={item._id} className={`${styles.item}`}>
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
        <div className={`${styles.wrapper} ${styles.column} ml-8 mb-2`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
            className="ml-8"
          />
        </div>
        <ul className={`${styles.container}  ${styles.column}`}>
          {renderInnerIngredients()}
        </ul>
        <div className="ml-8 mt-2">
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
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}; 

export default BurgerConstructor;
