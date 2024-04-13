import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ children, innerRef }) {
  return (
    <>
      <div className={styles.overlay} ref={innerRef}>
        {children}
      </div>
    </>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  ]),
};

export default ModalOverlay;
