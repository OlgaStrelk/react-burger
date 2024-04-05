import styles from "./info-tooltip.module.css";
import { BACKEND_VALIDATION_TEXT } from "../../utils/consts";

function InfoTooltip({ errorCode }) {
  const errorText =
    errorCode === 401
      ? BACKEND_VALIDATION_TEXT.badRequestErrorText
      : errorCode === 409
      ? BACKEND_VALIDATION_TEXT.conflictErrorText
      : BACKEND_VALIDATION_TEXT.serverRespondErrorText;
  return (
    <>
      <p>
        <span className={styles.text}>{errorText}</span>
      </p>
    </>
  );
}

export default InfoTooltip;
