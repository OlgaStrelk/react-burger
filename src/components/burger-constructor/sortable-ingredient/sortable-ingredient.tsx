import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

import styles from "./sortable-ingredient.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TConstructorIngredient } from "../../../utils/types";
import { useDispatch, useSelector } from "../../../hooks/types";
import {
  sortIngredients,
  deleteIngredient,
} from "../../../services/actions/constructor-ingredients";
import { decreaseQuantity } from "../../../services/actions/ingredients";
export interface ISortableIngredientProps {
  data: TConstructorIngredient;
  index: number;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const SortableIngredient = ({
  data,
  index,
}: ISortableIngredientProps) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (store) => store.burgerConstructor.addedIngredients.ingredients
  );

  const moveListItem = (dragIndex: number, hoverIndex: number) => {
    const dragCard = ingredients[dragIndex];
    const newIngredients = [...ingredients];
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragCard);
    //@ts-ignore
    dispatch(sortIngredients());
  };

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "listItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: DragItem, monitor) => {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
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

  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "listItem",
    item: () => {
      return { data, index };
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const opacity = isDragging
    ? styles.opacity_visible
    : styles.opacity_invisible;

  drag(drop(ref));

  const onDelete = () => {
    //@ts-ignore
    dispatch(deleteIngredient(data.id));
    //@ts-ignore
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
