import styles from "./my-account.module.css";

import { Link, NavLink, Outlet } from "react-router-dom";

import { PATHS } from "../utils/consts";
import { logout } from "../services/actions/auth";
import { useAppDispatch } from "../hooks/types";

function MyAccountPage() {
  const dispatch = useAppDispatch();
  const signout = () => {
    dispatch(logout());
  };
  const NAVLINKS_DATA = [
    { id: "5", text: "Профиль", path: PATHS.profile },
    { id: "6", text: "История заказов", path: PATHS.ordersHistory },
    { id: "7", text: "Выход", onClick: signout },
  ];
  const navBarMarkup = NAVLINKS_DATA.map(({ id, text, path, onClick }) => {
    if (path) {
      return (
        <li className={styles.nav_item} key={id}>
          <NavLink
            end={true}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
            to={path}
          >
            {text}
          </NavLink>
        </li>
      );
    } else {
      return (
        <li className={styles.nav_item} key={id}>
          <Link
            className={styles.inactive}
            to=".."
            relative="path"
            onClick={onClick}
          >
            {text}
          </Link>
        </li>
      );
    }
  });

  return (
    <div className={styles.grid}>
      <ul className={styles.nav_bar}>{navBarMarkup}</ul>
      <Outlet />
    </div>
  );
}

export default MyAccountPage;
