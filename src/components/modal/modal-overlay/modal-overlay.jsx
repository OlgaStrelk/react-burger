import styles from "./modal-overlay.module.css";
import { createRef } from "react";

function ModalOverlay({ children, innerRef }) {
  
  return (
    <>
      <div className={styles.overlay} ref={innerRef}>{children}</div>
    </>
  );
}

export default ModalOverlay;
