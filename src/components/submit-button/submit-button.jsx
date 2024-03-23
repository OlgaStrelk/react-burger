import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function SubmitButton({ data }) {
  const { btn, link, caption } = data;
  const STYLES_CONFIG = {
    buttonClassName: "button",
    disabledButtonClassName: "button_disabled",
    captionClassName: "caption",
    textClassName: "text",
    linkClassName: "link",
  };

  return (
    <>
      <Button htmlType={btn.type} type="primary" size="large">
        {btn.title}
      </Button>
      <div className={STYLES_CONFIG.captionClassName}>
        <p className={STYLES_CONFIG.textClassName}>{caption}</p>
        <Link to={link.path} className={STYLES_CONFIG.linkClassName}>
          {link.title}
        </Link>
      </div>
    </>
  );
}

export default SubmitButton;
