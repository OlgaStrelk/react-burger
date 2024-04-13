import styles from './redirect.module.css'
import { Link } from "react-router-dom";

function Redirect({ data }) {
  const renderNavigationMarkup = () => {
    return data.map(({ id, caption, link: { path, title } }) => (
      <div className="" key={id}>
        <p className={styles.caption}>
          {caption}
          <Link className={styles.link} to={path}>
            {title}
          </Link>
        </p>
      </div>
    ));
  };
  return <>{renderNavigationMarkup()}</>;
}
export default Redirect;
