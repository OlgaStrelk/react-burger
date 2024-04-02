import { useState } from "react";
import { useDispatch } from "react-redux";
export const useForm = (initialValue) => {
  const dispatch = useDispatch();

  const handleInput = (e, reducer) => {
    console.log(e.target.value)
    dispatch(reducer(e.target.name, e.target.value));
  };

  const handleSubmit = async (e, reducer, isValid) => {
    e.preventDefault();
    if (isValid) {
      dispatch(reducer());
    } else return;
  };

  return { handleInput, handleSubmit };
};
