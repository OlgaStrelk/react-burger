import { SyntheticEvent } from "react";
import { useAppDispatch } from "../services/types/hooks";
export const useForm = () => {
  const dispatch = useAppDispatch();
//@ts-ignore
  const handleInput = (e, reducer) => {
    dispatch(reducer(e.target.name, e.target.value));
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>, reducer: () => any, isValid:boolean) => {
    e.preventDefault();
    if (isValid) {
      dispatch(reducer());
    } else return;
  };

  return { handleInput, handleSubmit };
};
