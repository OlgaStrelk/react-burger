import { useEffect } from "react";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import { createRef } from "react";
import PropTypes from "prop-types";


const modalRoot = document.getElementById("react-modals");
function Modal({ children, onClose, action }) {
  const overlayRef = createRef();

  const handleClose = () => {
    onClose(action);
  };
  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const addListeners = () => {
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleOverlayClick);
  };
  const removeListeners = () => {
    document.removeEventListener("keydown", handleEscClose);
    document.removeEventListener("click", handleOverlayClick);
  };
  useEffect(() => {
    addListeners();
    return () => {
      removeListeners();
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay innerRef={overlayRef}>
        <div className={`${styles.container} pt-10 pb-15`}>
          <div className={styles.icon}>
            <CloseIcon type="primary" onClick={handleClose} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
