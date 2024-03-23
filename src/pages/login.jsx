import styles from "./register.module.css";
import AuthForm from "../components/auth-form/auth-form";
import { PATHS } from "../utils/consts";
import { useRef } from "react";
import { useInput } from "../hooks/useInput";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import Redirect from "../components/redirect/redirect";
function LoginPage() {
  const { register, forgotPassword } = PATHS;
  const [value, handleInput] = useInput("hjsf");

  const inputRef = useRef(null);

  const onSubmit = () => {};

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

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>{FORM_DATA.title}</h1>
        <AuthForm onSubmit={onSubmit} btn={FORM_DATA.btn.text}>
          {inputsMarkup}
        </AuthForm>
        <Redirect data={FORM_DATA.redirect} />
      </main>
    </>
  );
}

export default LoginPage;
