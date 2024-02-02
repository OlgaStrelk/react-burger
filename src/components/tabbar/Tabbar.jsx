import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { titlesArrayShape } from "../../utils/shapes";

function Tabbar({ data }) {
  const [current, setCurrent] = useState(data[0].value);

  return (
    <div style={{ display: "flex" }} className="mt-5">
      {data.map((item) => (
        <Tab
          key={item.id}
          value={item.value}
          active={current === item.value}
          onClick={setCurrent}
        >
          {item.title}
        </Tab>
      ))}
    </div>
  );
}

Tabbar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(titlesArrayShape)),
};

export default Tabbar;
