import { useState, forwardRef } from "react";
import styles from "./Tabbar.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { titlesArrayShape } from "../../utils/shapes";

const Tabbar = ({ data, handler, currentTab }) => {
  const handleClick = (e) => {
    handler(e);
  };

  return (
    <div className={`${styles.container} mt-5`}>
      {data.map((item) => (
        <Tab
          key={item.id}
          value={item.value}
          active={currentTab === item.value}
          onClick={handleClick}
          id={item.value}
        >
          {item.title}
        </Tab>
      ))}
    </div>
  );
};

Tabbar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(titlesArrayShape)),
  handler: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
};

export default Tabbar;
