import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
function Modal({ children, header, onClose }) {
  const handleClose = () => {
    // onClose(true)
  };

  return (
    <>
      <div className={`${styles.container} pt-30 pb-30`}>
        <CloseIcon type="primary" onClick={handleClose} />
        {children}
      </div>
    </>
  );
}

export default Modal;
