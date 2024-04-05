import formStyles from "./base-form.module.css";
import AuthForm from "../components/auth-form/auth-form";
import { PATHS } from "../utils/consts";
import { useForm } from "../hooks/useForm";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import Redirect from "../components/redirect/redirect";
import { useSelector } from "react-redux";
import { resetPasswordStepOne } from "../services/actions/auth";
import { resetPasswordOneFormValue } from "../services/actions/authForms";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ForgotPasswordPage() {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.resetForm.form);

  const { handleInput, handleSubmit, error } = useForm();

  useEffect(() => {
    if (email) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email]);

  const onFormChange = (e) => {
    handleInput(e, resetPasswordOneFormValue);
  };

  const onSubmit = (e) => {
    handleSubmit(e, resetPasswordStepOne, isValid);
    localStorage.setItem('emailsSent', 'true')
    navigate(PATHS.resetPassword, { replace: true });
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
