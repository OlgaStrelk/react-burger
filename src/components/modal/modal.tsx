import { ReactNode, useEffect, useRef } from "react";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../services/types/hooks";

const modalRoot = document.getElementById("react-modals");
type PropsWithChildren<P = unknown> = P & { children: ReactNode };

interface IModal {
  onClose?: () => void;
  action?: string | string[];
  path?: string;
  customStyle?: string;
  type: string;
}

function Modal({
  children,
  onClose,
  action,
  path,
  customStyle,
  type,
}: PropsWithChildren<IModal>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerClassName = customStyle
    ? `${styles.container} ${customStyle}`
    : styles.container;
  const iconClassName = customStyle
    ? `${styles.close_icon} ${customStyle}`
    : styles.close_icon;

  const updateData = (action: string | string[]) => {
    [...action].forEach((element) => {
      dispatch({ type: element });
    });
  };

  const handleClose = () => {
    if (path) {
      navigate(path);
    } else if (onClose) onClose();
    else if (action) {
      updateData(action);
    }
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
        <div data-cy={type} className={containerClassName}>
          <div className={iconClassName}               data-cy="close-icon"
>
            <CloseIcon
              type="primary"
              onClick={handleClose}
            />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot as Element
  );
}

export default Modal;
