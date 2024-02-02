import ReactDOM from "react-dom";
import styles from './modal-overlay.module.css'


const modalRoot = document.getElementById("react-modals");

function ModalOverlay({ children }) {
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}
      >
        {children}
      </div>
    </>,
    modalRoot
  );
}

export default ModalOverlay