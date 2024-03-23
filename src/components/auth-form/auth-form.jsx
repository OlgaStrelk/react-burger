import styles from "./auth-form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function AuthForm({ children, onSubmit, btn }) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <Button htmlType="submit" type="primary" size="large">
        {btn}
      </Button>
    </form>
  );
}

export default AuthForm;
