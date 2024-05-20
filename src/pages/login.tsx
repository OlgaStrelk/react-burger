import formStyles from "./base-form.module.css";
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";

import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AuthForm from "../components/auth-form/auth-form";
import Redirect from "../components/redirect/redirect";

import { PATHS } from "../utils/consts";
import { useForm } from "../hooks/useForm";
import { loginFormValue } from "../services/actions/auth-forms";
import { login } from "../services/actions/auth";
import { TInput } from "../utils/types";
import { useSelector } from "../hooks/types";

function LoginPage() {
  const { register, forgotPassword } = PATHS;
  const { password, email } = useSelector((state) => state.login.form);
  const { handleInput, handleSubmit } = useForm();
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (password && email) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password, email]);

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInput(e, loginFormValue);
  };

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    handleSubmit(e, login, isValid);
  };

  const FORM_DATA = {
    title: "Вход",
    btn: { text: "Войти" },
    redirect: [
      {
        id: 2,
        caption: "Вы — новый пользователь?",
        link: { path: register, title: "Зарегистрироваться" },
      },
      {
        id: 3,
        caption: "Забыли пароль?",
        link: { path: forgotPassword, title: "Восстановить пароль" },
      },
    ],
  };

  const INPUTS_DATA: TInput[] = [
    {
      id: 12,
      placeholder: "E-mail",
      name: "email",
      type: "email",
      value: email || "",
    },
    {
      id: 13,
      placeholder: "Пароль",
      name: "password",
      type: "password",
      value: password || "",
    },
  ];

  const inputsMarkup = INPUTS_DATA.map(
    ({ id, placeholder, name, type, value }) => {
      switch (type) {
        case "password": {
          return (
            <PasswordInput
              key={id}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onFormChange}
              extraClass={formStyles.input}
              icon="ShowIcon"
            />
          );
        }
        case "email": {
          return (
            <EmailInput
              key={id}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onFormChange}
              extraClass={formStyles.input}
            />
          );
        }
        default:
          return (
            <Input
              key={id}
              name={name}
              placeholder={placeholder}
              type={type}
              value={value}
              onChange={onFormChange}
              extraClass={formStyles.input}
            />
          );
      }
    }
  );
  const {
    title,
    btn: { text },
    redirect,
  } = FORM_DATA;

  return (
    <>
      <main className={formStyles.main}>
        <h1 className={formStyles.title}>{title}</h1>
        <AuthForm onSubmit={onSubmit} btn={text} isValid={isValid}>
          {inputsMarkup}
        </AuthForm>
        <Redirect data={redirect} />
      </main>
    </>
  );
}

export default LoginPage;
