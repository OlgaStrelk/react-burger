import formStyles from "./base-form.module.css";
import AuthForm from "../components/auth-form/auth-form";
import { PATHS } from "../utils/consts";
import { useForm } from "../hooks/useForm";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import Redirect from "../components/redirect/redirect";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordFormValue } from "../services/actions/user";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ForgotPasswordPage() {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.form);
  const { handleInput } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (email) setIsValid(true);
    else {
      setIsValid(false);
    }
  }, [email]);

  const onFormChange = (e) => {
    handleInput(e, resetPasswordFormValue);
  };

  const onSubmit = (e, email) => {
    const path = PATHS.resetPassword;
    e.preventDefault();
    if (isValid) {
      dispatch(resetPassword(email));
      navigate(path, { replace: true });
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
      name: "email",
      type: "text",
      value: email || "",
    },
  ];

  const inputsMarkup = INPUTS_DATA.map(
    ({ id, placeholder, name, type, value }) => (
      <Input
        key={id}
        name={name}
        id={name}
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
export default ForgotPasswordPage;
