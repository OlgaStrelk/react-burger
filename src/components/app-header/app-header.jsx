import styles from "./app-header.module.css";
import {
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Navbar from "../nav-bar/nav-bar";


export default function AppHeader() {
  return (
    <header className={`${styles.header} pt-5 pb-5`}>
      <div className={`${styles.wrapper}`}>
        <div className={styles.centered}>
          <Logo />
        </div>
      <Navbar />
      </div>
    </header>
  );
}
