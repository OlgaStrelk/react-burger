import styles from "./tab-bar.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { titlesArrayShape } from "../../utils/types";

const Tabbar = ({ data, onTabClick, currentTab }) => {
  const handleClick = (e) => {
    onTabClick(e);
  };

  const renderTabMarkup = () => {
    return data.map((item) => (
      <Tab
        key={item.id}
        value={item.value}
        active={currentTab === item.value}
        onClick={handleClick}
        id={item.value}
      >
        {item.title}
      </Tab>
    ));
  };
  return <div className={`${styles.container} mt-5`}>{renderTabMarkup()}</div>;
};

Tabbar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(titlesArrayShape)),
  onTabClick: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
};

export default Tabbar;
