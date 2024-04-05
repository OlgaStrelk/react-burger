import styles from "./app-header.module.css";
import {
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Navbar from "../nav-bar/nav-bar";
import { Link } from "react-router-dom";
import { PATHS } from "../../utils/consts";


export default function AppHeader() {
  return (
    <header className={`${styles.header} pt-5 pb-5`}>
      <div className={`${styles.wrapper}`}>
        <Link to={PATHS.home} className={styles.centered}>
          <Logo />
        </Link>
      <Navbar />
      </div>
    </header>
  );
}
