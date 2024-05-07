import { useDispatch } from "react-redux";
export const useForm = () => {
  const dispatch = useDispatch();

  const handleInput = (e, reducer) => {
    dispatch(reducer(e.target.name, e.target.value));
  };

  const handleSubmit = (e, reducer, isValid) => {
    e.preventDefault();
    if (isValid) {
      dispatch(reducer());
    } else return;
  };

  return { handleInput, handleSubmit };
};
