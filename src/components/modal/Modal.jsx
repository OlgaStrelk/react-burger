const modalRoot = document.getElementById("react-modals");

function Modal({ children, header, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div className="Modal">
        <ModalHeader onClose={onClose}>{header}</ModalHeader>
        {children}
      </div>
      <ModalBackDrop onClose={onClose} />
    </>,
    modalRoot
  );
}
