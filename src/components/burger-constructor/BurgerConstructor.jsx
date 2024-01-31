import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Total from "../total/Total";
function BurgerConstructor({ data }) {
  const img = data[0]?.image;
  console.log(data)
  return (
    <section className={`${styles.section} mt-25 ml-10`}>
      <div className={`${styles.wrapper} ${styles.column}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={img}
        />
        <div className={`${styles.container}  ${styles.column}`}>
          <ConstructorElement
            text={data[8]?.name}
            price={data[8]?.price}
            thumbnail={data[8]?.image}
          />
          <ConstructorElement
            text={data[14]?.name}
            price={data[14]?.price}
            thumbnail={data[14]?.image}
          />
          <ConstructorElement
            text={data[1]?.name}
            price={data[1]?.price}
            thumbnail={data[1]?.image}
          />
          <ConstructorElement
            text={data[6]?.name}
            price={data[6]?.price}
            thumbnail={data[6]?.image}
          />
          <ConstructorElement
            text={data[2]?.name}
            price={data[2]?.price}
            thumbnail={data[2]?.image}
          />
          <ConstructorElement
            text={data[3]?.name}
            price={data[3]?.price}
            thumbnail={data[3]?.image}
          />
          <ConstructorElement
            text={data[10]?.name}
            price={data[10]?.price}
            thumbnail={data[10]?.image}
          />
          <ConstructorElement
            text={data[13]?.name}
            price={data[13]?.price}
            thumbnail={data[13]?.image}
          />
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={img}
        />
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

export default BurgerConstructor;
