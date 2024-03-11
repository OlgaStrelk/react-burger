import { useDispatch } from "react-redux";
import { useState } from "react";
export const useModal = (initialValue) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(initialValue);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = (action) => {
    dispatch({ type: action });
    setIsOpen(false);
  };

  return [isOpen, onOpen, onClose];
};
