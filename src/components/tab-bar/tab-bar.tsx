import { TTitles } from "../../utils/types";
import styles from "./tab-bar.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
interface ITabbar {
  data: TTitles[],
  onTabClick: (value: string) => void,
  currentTab: string
}
const Tabbar = ({ data, onTabClick, currentTab }:ITabbar) => {
  const handleClick = (value:string) => {
    onTabClick(value);
  };

  const renderTabMarkup = () => {
    return data.map((item) => (
      <Tab
        key={item.id}
        value={item.value}
        active={currentTab === item.value}
        onClick={handleClick}
      >
        {item.title}
      </Tab>
    ));
  };
  return <div className={`${styles.container} mt-5`}>{renderTabMarkup()}</div>;
};

export default Tabbar;
