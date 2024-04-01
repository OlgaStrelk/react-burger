import formStyles from "./base-form.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AuthForm from "../components/auth-form/auth-form";
import Redirect from "../components/redirect/redirect";

import { PATHS } from "../utils/consts";
import { useForm } from "../hooks/useForm";
import { registerFormValue } from "../services/actions/authForms";
import { register } from "../services/actions/auth";

function Register(props) {
  const { name, password, email } = useSelector((state) => state.register.form);

  const { handleInput, handleSubmit } = useForm();
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (password && email && name) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password, email, name]);
  const onFormChange = (e) => {
    handleInput(e, registerFormValue);
  };

  const onSubmit = (e) => {
    handleSubmit(e, register, isValid);
  };

  const FORM_DATA = {
    title: "Регистрация",
    btn: { text: "Зарегистрироваться" },
    redirect: [
      {
        id: 1,
        caption: "Уже зарегистрированы?",
        link: { path: PATHS.login, title: "Войти" },
      },
    ],
  };

  const INPUTS_DATA = [
    {
      id: 11,
      placeholder: "Имя",
      name: "name",
      type: "text",
      value: name || "",
    },
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
              type={type}
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
              type={type}
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

export default Register;
