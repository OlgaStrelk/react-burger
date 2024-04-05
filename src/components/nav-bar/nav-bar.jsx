import { NavLink } from "react-router-dom";
import styles from "./nav-bar.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PATHS } from "../../utils/consts";
import { useSelector } from "react-redux";

function Navbar() {
  const { ordersList, home, profile } = PATHS;
  const user = useSelector((state) => state.user.user);
  const profileLinkText = user && user.name ? user.name : "Личный кабинет";
  const NAVBAR_DATA = [
    {
      id: 1,
      text: "Конструктор",
      icon: <BurgerIcon type="primary" />,
      link: home,
    },
    {
      id: 2,
      text: "Лента заказов",
      icon: <ListIcon type="primary" />,
      link: ordersList,
    },
    {
      id: 3,
      text: profileLinkText,
      icon: <ProfileIcon type="primary" />,
      link: profile,
    },
  ];

  const renderNavBarMarkup = () => {
    return NAVBAR_DATA.map((item) => (
      <li key={item.id} className={styles.listItem}>
        <NavLink
          to={item.link}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          {item.icon}
          <span className={styles.text}>{item.text}</span>
        </NavLink>
      </li>
    ));
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>{renderNavBarMarkup()}</ul>
    </nav>
  );
}

export default Navbar;
