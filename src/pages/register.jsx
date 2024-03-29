import formStyles from "./base-form.module.css";
import AuthForm from "../components/auth-form/auth-form";
import { PATHS } from "../utils/consts";
import { useRef } from "react";
import { useForm } from "../hooks/useForm";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import Redirect from "../components/redirect/redirect";
function Register(props) {
  const [value, handleInput] = useForm("hjsf");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = (data) => {};

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
      // ref: nameRef,
    },
    {
      id: 12,
      placeholder: "E-mail",
      name: "email",
      type: "email",
      // ref: emailRef,
    },
    {
      id: 13,
      placeholder: "Пароль",
      name: "password",
      type: "password",
      // ref: passwordRef,
    },
  ];

  const inputsMarkup = INPUTS_DATA.map(({ id, placeholder, name, type }) => (
    <Input
      ref={inputRef}
      key={id}
      name={name}
      placeholder={placeholder}
      type={type}
      value=""
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
        <AuthForm onSubmit={onSubmit} btn={text}>
          {inputsMarkup}
        </AuthForm>
        <Redirect data={redirect} />
      </main>
    </>
  );
}

export default Register;
