import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../services/actions/ingredients";
import { useMemo } from "react";

function IngredientPage() {
  const [currentIngredient, setCurrentIngredient] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients?.ingredients);
  const foundIngredient = useMemo(() =>
    ingredients.find((item) => {
      return id === item._id;
    })
  );
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  useEffect(() => {
    setCurrentIngredient(foundIngredient);
  }, [foundIngredient]);

  return (
    <>{ingredients && <IngredientDetails cardData={currentIngredient} />}</>
  );
}

export default IngredientPage;
