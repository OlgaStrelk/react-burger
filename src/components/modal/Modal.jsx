import { useEffect } from "react";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("react-modals");
function Modal({ children, onClose }) {
  useEffect(()=>{document.addEventListener("keydown", (e)=>{if(e.key==="Escape"){onClose()}})
  
  
  return document.removeEventListener("keydown", (e)=>{console.log(e)},[])})
  const handleClose = (e) => {
    onClose(e);
  };

  return ReactDOM.createPortal(
    <>
      <ModalOverlay>
        <div className={`${styles.container} pt-10 pb-15`}>
          <div className={styles.icon}><CloseIcon type="primary" onClick={handleClose} /></div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
}

export default Modal;
