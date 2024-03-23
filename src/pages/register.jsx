import styles from "./register.module.css";
import AuthForm from "../components/auth-form/auth-form";
import { PATHS } from "../utils/consts";
import { useRef } from "react";
import { useInput } from "../hooks/useInput";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import Redirect from "../components/redirect/redirect";
function Register(props) {
  const [value, handleInput] = useInput("hjsf");

  const inputRef = useRef(null);

  const onSubmit = (data) => {};

  const FORM_DATA = {
    title: "Регистрация",
    className: styles.title,
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
    },
    {
      id: 12,
      placeholder: "E-mail",
      name: "email",
      type: "email",
    },
    {
      id: 13,
      placeholder: "Пароль",
      name: "password",
      type: "password",
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
    />
  ));
  const { title, btn: {text}, redirect } = FORM_DATA;

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <AuthForm onSubmit={onSubmit} btn={text}>
          {inputsMarkup}
        </AuthForm>
        <Redirect data={redirect} />
      </main>
    </>
  );
}

export default Register;
