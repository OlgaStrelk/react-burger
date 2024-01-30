import { Fragment } from "react";
function IngedientsBlock({ titles, data }) {

// data.filter()
  return (
    <>
      {titles.map((item) => 
         <Fragment key={item.id}>
          <h3>{item.title}</h3>
          
        </Fragment>
      )}
    </>
  );
}
export default IngedientsBlock;
