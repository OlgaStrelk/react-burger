import { useState } from "react";
import { useDispatch } from "react-redux";
export const useForm = (initialValue) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleInput = (e, reducer) => {
    dispatch(reducer(e.target.name, e.target.value));
  };

  const handleSubmit = (e, data, isValid, reducer) => {
    e.preventDefault();
    if (isValid) {
      dispatch(reducer(data));
      setError("");
    } else {
      setError("Форма не заполнена");
      return null;
    }
  };

  return { handleInput, handleSubmit, error };
};
