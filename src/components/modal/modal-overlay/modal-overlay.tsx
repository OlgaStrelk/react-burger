import { LegacyRef, PropsWithChildren } from "react";
import styles from "./modal-overlay.module.css";

function ModalOverlay({
  children,
  innerRef,
}: PropsWithChildren<{ innerRef: LegacyRef<HTMLDivElement> }>) {
  return (
    <>
      <div className={styles.overlay} ref={innerRef}>
        {children}
      </div>
    </>
  );
}

export default ModalOverlay;
