import styles from "./profile.module.css";

import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../hooks/useForm";
import { ChangeEvent, SyntheticEvent, useEffect } from "react";
import { editProfile } from "../services/actions/user";
import { TInput } from "../utils/types";
import Preloader from "../components/preloader/preloader";
import { passwordStub } from "../utils/consts";
import { useAppDispatch, useSelector } from "../services/types/hooks";
import { editProfileFormValue } from "../services/actions/profile-form";
import { FETCHING_FAILED_ERROR_TEXT } from "../utils/errors";

function ProfilePage() {
  const { user, userRequest: isLoading } = useSelector((state) => state.user);

  const {
    name: formName,
    email: formEmail,
    password: formPassword,
  } = useSelector((state) => state.profile.form);

  const dispatch = useAppDispatch();

  const { handleInput, handleSubmit } = useForm();

  useEffect(() => {
    putInitialtValues();
  }, []);

  const onPasswordFocus = () => {
    dispatch(editProfileFormValue("password", ""));
  };

  const onPasswordBlur = () => {
    if (formPassword === "" || formPassword.length < 8) {
      dispatch(editProfileFormValue("password", passwordStub));
    }
  };
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInput(e, editProfileFormValue);
  };

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    let isValid = true;
    handleSubmit(e, editProfile, isValid);
  };

  const putInitialtValues = () => {
    dispatch(editProfileFormValue("name", user?.name || ""));
    dispatch(editProfileFormValue("email", user?.email || ""));
  };

  const resetForm = () => {
    putInitialtValues();
  };

  const INPUTS_DATA: TInput[] = [
    {
      id: "1",
      name: "name",
      value: formName,
      placeholder: "Имя",
      type: "text",
    },
    {
      id: "2",
      name: "email",
      value: formEmail,
      placeholder: "Логин",
      type: "email",
    },
    {
      id: "3",
      name: "password",
      placeholder: "Пароль",
      value: formPassword,
      type: "password",
    },
  ];

  const inputsMarkup = INPUTS_DATA.map(
    ({ id, placeholder, name, type, value }) => {
      switch (type) {
        case "password": {
          return (
            <li className={styles.input} key={id}>
              <Input
                icon="EditIcon"
                value={value || ""}
                onChange={onFormChange}
                onFocus={onPasswordFocus}
                onBlur={onPasswordBlur}
                name={name}
                placeholder={placeholder}
                type={type}
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
      ) : user?.name && user?.email ? (
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
          <h2 className={styles.title}>{FETCHING_FAILED_ERROR_TEXT.main}</h2>
        </main>
      )}
    </>
  );
}

export default ProfilePage;
