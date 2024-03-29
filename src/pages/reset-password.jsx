import formStyles from "./base-form.module.css";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import AuthForm from "../components/auth-form/auth-form";
import Redirect from "../components/redirect/redirect";

import { PATHS } from "../utils/consts";
import { useForm } from "../hooks/useForm";
import {
  resetPasswordTwoFormValue,
  resetPasswordStepTwo,
} from "../services/actions/authForms";

function ResetPasswordPage() {
  const { password, token } = useSelector((state) => state.resetFormTwo.form);

  console.log();
  const { handleInput, handleSubmit, error } = useForm();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (password && token) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password, token]);

  const FORM_DATA = {
    title: "Восстановление пароля",
    btn: { text: "Восстановить" },
    redirect: [
      {
        id: 1,
        caption: "Вспомнили пароль?",
        link: { path: PATHS.login, title: "Войти" },
      },
    ],
  };

  const INPUTS_DATA = [
    {
      id: 14,
      placeholder: "Введите новый пароль",
      name: "password",
      type: "text",
      value: password || "",
    },
    {
      id: 15,
      placeholder: "Введите код из письма",
      name: "token",
      type: "text",
      value: token || "",
    },
  ];

  const onFormChange = (e) => {
    handleInput(e, resetPasswordTwoFormValue);
  };

  const onSubmit = (e) => {
    // const path = PATHS;
    handleSubmit(e, resetPasswordStepTwo, isValid);
    // navigate(path, { replace: true });
  };

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

export default ResetPasswordPage;
