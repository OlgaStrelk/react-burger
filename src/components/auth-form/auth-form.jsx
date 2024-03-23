import styles from "./auth-form.module.css";

function AuthForm({ children, onSubmit }) {
  return (
      <form onSubmit={onSubmit}>{children}</form>
  );
}

export default AuthForm;
