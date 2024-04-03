import styles from "./profile.module.css";

import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PATHS } from "../utils/consts";
import { useForm } from "../hooks/useForm";
import { useEffect } from "react";
import { editProfileFormValue } from "../services/actions/authForms";
import { editProfile } from "../services/actions/user";

function ProfilePage() {
  const { name, email } = useSelector((state) => state.user.user);
  const form = useSelector((state) => state.profile.form);

  const dispatch = useDispatch();

  const { handleInput, handleSubmit } = useForm();
  const onPasswordChange = () => {
    dispatch(editProfileFormValue("password", null));
  };
  const onFormChange = (e) => {
    handleInput(e, editProfileFormValue);
  };

  const onSubmit = (e) => {
    let isValid = true;
    handleSubmit(e, editProfile, isValid);
  };

  useEffect(() => {
    dispatch(editProfileFormValue("name", name));
    dispatch(editProfileFormValue("email", email));
  }, []);

  const resetForm = () => {
    dispatch(editProfileFormValue("name", name));
    dispatch(editProfileFormValue("email", email));
  };
  const INPUTS_DATA = [
    {
      id: "1",
      name: "name",
      value: form.name,
      placeholder: "Имя",
      type: "text",
    },
    {
      id: "2",
      name: "email",
      value: form.email,
      placeholder: "Логин",
      type: "email",
    },
    {
      id: "3",
      name: "password",
      placeholder: "Пароль",
      value: form.password,
      type: "password",
    },
  ];

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
                value={value || ""}
                onChange={onFormChange}
                icon="EditIcon"
                onFocus={onPasswordChange}
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
                value={value || ""}
                onChange={onFormChange}
                isIcon={true}
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
                onChange={onFormChange}
                value={value || ""}
                icon="EditIcon"
              />
            </li>
          );
      }
    }
  );

  return (
    <>
      <p className={styles.paragraph}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
      <form onSubmit={onSubmit} className={styles.form}>
        <ul className={styles.list}>{inputsMarkup}</ul>
        <div className={styles.buttons}>
          <Button
            onClick={resetForm}
            htmlType="button"
            type="secondary"
            size="medium"
          >
            Отмена
          </Button>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      </form>
    </>
  );
}

export default ProfilePage;
