import styles from "./profile.module.css";

import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../hooks/useForm";
import { ChangeEvent, SyntheticEvent, useEffect } from "react";
import { editProfileFormValue } from "../services/actions/authForms";
import { editProfile } from "../services/actions/user";
import { TInput, TUser } from "../utils/types";
import Preloader from "../components/preloader/preloader";

function ProfilePage() {
  //@ts-ignore
  const { name, email }: TUser = useSelector((state) => state.user.user);
  //@ts-ignore

  const isLoading: boolean = useSelector((state) => state.user.userRequest);
  console.log(isLoading);
  //@ts-ignore
  const form = useSelector((state) => state.profile.form);

  const dispatch = useDispatch();

  const { handleInput, handleSubmit } = useForm();
  const onPasswordChange = () => {
    //@ts-ignore
    dispatch(editProfileFormValue("password", null));
  };
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInput(e, editProfileFormValue);
  };

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
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
  const INPUTS_DATA: TInput[] = [
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
      {isLoading ? (
        <Preloader />
      ) : name && email ? (
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
      ) : (
        <main className={styles.main_error}>
          <h2 className={styles.title}>
            Не&nbsp;удалось загрузить данные. Проверте соединение
            с&nbsp;интернетом или попробуйте позже
          </h2>
        </main>
      )}
    </>
  );
}

export default ProfilePage;
