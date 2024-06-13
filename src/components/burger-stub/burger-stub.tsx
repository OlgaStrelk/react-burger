import { FC } from "react";
import styles from "./burger-stub.module.css";
interface IBurgerStub {
  text: string;
  style: string;
}
const BurgerStub: FC<IBurgerStub> = ({ style, text }) => {
  return (
    <div className={`constructor-element ${style}`}>
      <span className="constructor-element__row">
        <span data-cy="stub-text" className="constructor-element__text">
          {text}
        </span>
      </span>
    </div>
  );
};
export default BurgerStub;
