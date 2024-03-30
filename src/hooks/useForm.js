import { useState } from "react";
import { useDispatch } from "react-redux";
export const useForm = (initialValue) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleInput = (e, reducer) => {
    dispatch(reducer(e.target.name, e.target.value));
  };

  const handleSubmit = async (e, reducer, isValid) => {
    e.preventDefault();
    if (isValid) {
      setError("");
      const data = await dispatch(reducer());
      if (data?.success) return data;
    } else {
      setError("Форма не заполнена");
      return null;
    }
  };

  return { handleInput, handleSubmit, error };
};
