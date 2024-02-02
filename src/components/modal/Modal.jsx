import styles from "./modal.module.css";
function Modal({ children, header, onClose, handler }) {


  return (
    <>
      <div className={`${styles.container} pt-30 pb-30`}>
        {children}
      </div>
    </>
  );
}

export default Modal;
