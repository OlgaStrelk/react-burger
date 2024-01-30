import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
function Tabbar({ data }) {
  const [current, setCurrent] = useState(data[0].value);

  return (
    <div style={{ display: "flex" }} className="mt-5">
      {data.map((item) => (
        <Tab key={item.id}
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

export default Tabbar;
