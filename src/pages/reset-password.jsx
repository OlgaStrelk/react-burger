import styles from "./register.module.css";
import AuthForm from "../components/auth-form/auth-form";
import { PATHS } from "../utils/consts";
import { useRef } from "react";
import { useInput } from "../hooks/useInput";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import Redirect from "../components/redirect/redirect";
function ResetPasswordPage() {
  const [value, handleInput] = useInput("hjsf");

  const inputRef = useRef(null);

  const onSubmit = (data) => {};

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
    },
    {
      id: 15,
      placeholder: "Введите код из письма",
      name: "code",
      type: "text",
    }
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
  
  export default ResetPasswordPage;



