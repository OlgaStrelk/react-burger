import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Navbar from "../nav-bar/NavBar";

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

export default function AppHeader() {
  return (
    <header className={`${styles.header} pt-5 pb-5`}>
      <div className={styles.centered}>
        <Logo />
      </div>
      <Navbar data={NAVBAR_DATA} />
    </header>
  );
}
