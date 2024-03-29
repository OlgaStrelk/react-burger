import { useDispatch } from "react-redux";
export const useForm = (initialValue) => {
  const dispatch = useDispatch();

  const handleInput = (e, reducer) => {
    dispatch(reducer(e.target.name, e.target.value));
  };

  const handleSubmit = () => {};

  return { handleInput };
};
