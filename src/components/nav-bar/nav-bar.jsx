import { NavLink } from "react-router-dom";
import styles from "./nav-bar.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Navbar() {
  const NAVBAR_DATA = [
    {
      id: 1,
      text: "Конструктор",
      icon: <BurgerIcon type="primary" />,
      link: "/",
    },
    {
      id: 2,
      text: "Лента заказов",
      icon: <ListIcon type="primary" />,
      link: "/orders",
    },
    {
      id: 3,
      text: "Личный кабинет",
      icon: <ProfileIcon type="primary" />,
      link: "/profile",
    },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {NAVBAR_DATA.map((item) => (
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
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
