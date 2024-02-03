import styles from "./navbar.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";
import { navbarDataShape } from "../../utils/shapes";

function Navbar() {
  const NAVBAR_DATA = [
    {
      id: 1,
      text: "Конструктор",
      style: "text text_type_main-default ",
      icon: <BurgerIcon type="primary" />,
    },
    {
      id: 2,
      text: "Лента заказов",
      style: "text text_type_main-default text_color_inactive",
      icon: <ListIcon type="primary" />,
    },
    {
      id: 3,
      text: "Личный кабинет",
      style: "text text_type_main-default text_color_inactive",
      icon: <ProfileIcon type="primary" />,
    },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {NAVBAR_DATA.map((item) => (
          <li key={item.id} className={`${styles.listItem} mr-2`}>
            <a className={`${styles.link} + ${item.style} pt-4 pb-4 pl-5 pr-5`}>
              {item.icon}
              <span className={`${styles.text} ml-2`}>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  navbarData: PropTypes.arrayOf(PropTypes.shape(navbarDataShape)),
};

export default Navbar;
