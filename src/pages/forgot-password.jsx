import formStyles from "./base-form.module.css";
import AuthForm from "../components/auth-form/auth-form";
import { PATHS } from "../utils/consts";
import { useRef } from "react";
import { useInput } from "../hooks/useInput";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import Redirect from "../components/redirect/redirect";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/actions/user";
import { useState, useEffect } from "react";
function ForgotPasswordPage() {
  const [isValid, setIsValid] = useState(false);
  const [value, handleInput] = useInput("");
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (value) setIsValid(true);
    else {
      setIsValid(false);
    }
  }, [value]);
  const onSubmit = (e, value) => {
    e.preventDefault();
    if (isValid) {
      dispatch(resetPassword(value));
    } else {
      setError("Форма не заполнена");
    }
  };

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
      placeholder: "Укажите e-mail",
      name: "e-mail",
      type: "text",
    },
  ];

  const inputsMarkup = INPUTS_DATA.map(({ id, placeholder, name, type }) => (
    <Input
      ref={inputRef}
      key={id}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleInput}
      extraClass={formStyles.input}
    />
  ));

  const {
    title,
    btn: { text },
    redirect,
  } = FORM_DATA;

  return (
    <>
      <main className={formStyles.main}>
        <h1 className={formStyles.title}>{title}</h1>
        <AuthForm onSubmit={onSubmit} btn={text} error={error} isValid={isValid}>
          {inputsMarkup}
        </AuthForm>
        <Redirect data={redirect} />
      </main>
    </>
  );
}
export default ForgotPasswordPage;
