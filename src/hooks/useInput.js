import { useDispatch } from "react-redux";
import { useState } from "react";
export const useInput = (initialValue) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(initialValue);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return [value, handleInput];
};
