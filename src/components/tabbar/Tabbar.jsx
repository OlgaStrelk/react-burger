import { useState, forwardRef } from "react";
import styles from "./Tabbar.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { titlesArrayShape } from "../../utils/shapes";

const Tabbar = ({ data }) => {
  const [current, setCurrent] = useState(data[0].value);
  const scrolLWithUseRef = (ref) => {
    ref.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  };
  const handleClick = (e) => {
    setCurrent(e);
    scrolLWithUseRef(e);
  };

  return (
    <div className={`${styles.container} mt-5`}>
      {data.map((item) => (
        <Tab
          key={item.id}
          value={item.value}
          active={current === item.value}
          onClick={handleClick}
          id={item.value}
          ref={item.ref}
        >
          {item.title}
        </Tab>
      ))}
    </div>
  );
};

Tabbar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(titlesArrayShape)),
};

export default Tabbar;
