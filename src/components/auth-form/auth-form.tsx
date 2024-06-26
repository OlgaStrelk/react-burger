import { FC, ReactNode, SyntheticEvent } from "react";
import styles from "./auth-form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
interface IAuthForm {
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
  btn: string;
  isValid: boolean;
  children?: ReactNode;
}
const AuthForm: FC<IAuthForm> = ({ onSubmit, btn, isValid, children }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={styles.button}
        disabled={!isValid}
        data-cy="submit-button"
      >
        {btn}
      </Button>
    </form>
  );
};

export default AuthForm;
