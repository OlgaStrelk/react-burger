import { ReactNode, SyntheticEvent, useEffect, useRef } from "react";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const modalRoot = document.getElementById("react-modals");
type PropsWithChildren<P = unknown> = P & { children: ReactNode };

interface IModal {
  onClose?: () => void;
  action: string | string[];
  path?: string;
  customStyle?: string;
}

function Modal({
  children,
  onClose,
  action,
  path,
  customStyle,
}: PropsWithChildren<IModal>) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const overlayRef = useRef();
  const containerClassName = customStyle
    ? `${styles.container} ${customStyle}`
    : styles.container;
  const iconClassName = customStyle
    ? `${styles.icon} ${customStyle}`
    : styles.icon;

  const updateData = (action: string | string[]) => {
    // if (typeof action == "string") {
    //   dispatch({ type: action });
    // } else {
    [...action].forEach((element) => {
      dispatch({ type: element });
    });
    // }
  };

  const handleClose = () => {
    if (path) {
      navigate(path);
    } else if (onClose) onClose();
    updateData(action);
  };

  const handleEscClose = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const handleOverlayClick = (e: MouseEvent) => {
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
        <div className={containerClassName}>
          <div className={iconClassName}>
            <CloseIcon type="primary" onClick={handleClose} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot as Element
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func,
};

export default Modal;
