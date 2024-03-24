import styles from "./auth-form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function AuthForm({ children, onSubmit, btn }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={styles.button}
      >
        {btn}
      </Button>
    </form>
  );
}

export default AuthForm;
