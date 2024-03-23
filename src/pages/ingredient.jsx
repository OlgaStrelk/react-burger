import { useDispatch } from "react-redux";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useEffect } from "react";
import { fetchIngredients } from "../services/actions/ingredients";

function IngredientPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);
  return (
    <>
      <IngredientDetails />
    </>
  );
}

export default IngredientPage;
