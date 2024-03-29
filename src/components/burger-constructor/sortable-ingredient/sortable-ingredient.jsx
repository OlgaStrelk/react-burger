import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import styles from "./sortable-ingredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  SORT_INGREDIENTS,
  deleteIngredient,
} from "../../../services/actions/ingredients";
export const SortableIngredient = ({ data, index }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (store) => store.burgerConstructor.addedIngredients.ingredients
  );

  const moveListItem = (dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex];
    const newIngredients = [...ingredients];
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragCard);
    dispatch({ type: SORT_INGREDIENTS, payload: newIngredients });
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "listItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "listItem",
    item: () => {
      return { data, index };
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  const onDelete = () => {
    dispatch(deleteIngredient(data.id));
    dispatch(decreaseQuantity(data._id));
  };

  return (
    <li
      ref={ref}
      id={data.id}
      className={`${styles.item} mr-3`}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        extraClass={opacity}
        handleClose={onDelete}
      />
    </li>
  );
};
