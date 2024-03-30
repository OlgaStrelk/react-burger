import styles from "./profile.module.css";

import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { PATHS } from "../utils/consts";
import { useForm } from "../hooks/useForm";

function ProfilePage() {
  const { name, login, password } = useSelector((state) => state.user);
  const { onFormChange } = useForm();
  const INPUTS_DATA = [
    {
      id: "1",
      name: "name",
      value: name || "",
      placeholder: "Имя",
      type: "text",
    },
    {
      id: "2",
      name: "login",
      value: login || "",
      placeholder: "Логин",
      type: "email",
    },
    {
      id: "3",
      name: "password",
      placeholder: "Пароль",
      value: password || "",
      type: "password",
    },
  ];

  const NAVLINKS_DATA = [
    { id: "5", text: "Профиль", path: PATHS.profile },
    { id: "6", text: "История заказов", path: PATHS.ordersHistory },
    { id: "7", text: "Выход", path: PATHS.ingredient },
  ];
  const navBarMarkup = NAVLINKS_DATA.map(({ id, text, path }) => (
    <li className={styles.nav_item} key={id}>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
        to={path}
      >
        {text}
      </NavLink>
    </li>
  ));
  const inputsMarkup = INPUTS_DATA.map(
    ({ id, placeholder, name, type, value }) => {
      if (type === "password") {
        return (
          <li key={id}>
            <PasswordInput
              name={name}
              id={name}
              placeholder={placeholder}
              type={type}
              value={value}
              onChange={onFormChange}
              extraClass={styles.input}
              icon="ShowIcon"
            />
          </li>
        );
      } else {
        return (
          <li key={id}>
            <Input
              key={id}
              name={name}
              id={name}
              placeholder={placeholder}
              type={type}
              value={value}
              onChange={onFormChange}
              extraClass={styles.input}
              icon="EditIcon"
            />
          </li>
        );
      }
    }
  );

  return (
    <div className={styles.grid}>
      <ul className={styles.nav_bar}>{navBarMarkup}</ul>
      <p className={styles.paragraph}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
      <form className={styles.form}>
        <ul className={styles.list}>{inputsMarkup}</ul>
      </form>
    </div>
  );
}

export default ProfilePage;
