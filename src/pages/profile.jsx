import styles from "./profile.module.css";

import {
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { PATHS } from "../utils/consts";
import { useForm } from "../hooks/useForm";

function ProfilePage() {
  const { name, email, password } = useSelector((state) => state.user.user);


  const { handleInput } = useForm();
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
      name: "email",
      value: email || "",
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
      switch (type) {
        case "password": {
          return (
            <li className={styles.input} key={id}>
              <PasswordInput
                key={id}
                name={name}
                placeholder={placeholder}
                type={type}
                // value={}
                defaultValue={value}
                onChange={handleInput}
                extraClass={styles.input}
                icon="ShowIcon"
                isIcon={true}
              />
            </li>
          );
        }
        case "email": {
          return (
            <li className={styles.input} key={id}>
              <EmailInput
                key={id}
                name={name}
                placeholder={placeholder}
                type={type}
                // value={value}
                defaultValue={value}
                onChange={handleInput}
                extraClass={styles.input}
                isIcon={true}
                icon="EditIcon"
              />
            </li>
          );
        }
        default:
          return (
            <li className={styles.input} key={id}>
              <Input
                name={name}
                placeholder={placeholder}
                type={type}
                // value={value}
                defaultValue={value}
                onChange={handleInput}
                isIcon={true}
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
