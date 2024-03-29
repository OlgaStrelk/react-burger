import formStyles from "./base-form.module.css";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import AuthForm from "../components/auth-form/auth-form";
import Redirect from "../components/redirect/redirect";

import { PATHS } from "../utils/consts";
import { useForm } from "../hooks/useForm";
import { login, loginFormValue } from "../services/actions/authForms";
function LoginPage() {
  const { register, forgotPassword } = PATHS;
  const { password, email } = useSelector((state) => state.login.form);
  const { handleInput, handleSubmit, error } = useForm();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (password && email) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password, email]);

  const onFormChange = (e) => {
    handleInput(e, loginFormValue);
  };

  const onSubmit = (e) => {
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

  const INPUTS_DATA = [
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
    ({ id, placeholder, name, type, value }) => (
      <Input
        key={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onFormChange}
        extraClass={formStyles.input}
      />
    )
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
        <AuthForm
          onSubmit={onSubmit}
          btn={text}
          error={error}
          isValid={isValid}
        >
          {inputsMarkup}
        </AuthForm>
        <Redirect data={redirect} />
      </main>
    </>
  );
}

export default LoginPage;
