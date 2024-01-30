import { Fragment } from "react";
import IngredientCard from "../ingredient-card/IngredientCard";
function IngedientsBlock({ titles, data }) {
    console.log(data)
  const renderFilteredIngredients = (blockTitle) => {
    const newArray = data.filter(
      (ingredient) => ingredient.type === blockTitle?.value
    );
    return newArray.map((item) => (
      <IngredientCard key={item._id} data={item} />
    ));
  };

  return (
    <div className="mt-10">
      {titles.map((item) => (
        <Fragment key={item.id}>
          <h3>{item.title}</h3>
          <div className="wrapper">{renderFilteredIngredients(item)}</div>
        </Fragment>
      ))}
    </div>
  );
}
export default IngedientsBlock;
