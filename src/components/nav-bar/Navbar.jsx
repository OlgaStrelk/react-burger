import styles from "./navbar.module.css";
import PropTypes from "prop-types";
import { navbarDataShape } from "../../utils/shapes";

function Navbar({ navbarData }) {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {navbarData.map((item) => (
          <li key={item.id} className={`${styles.listItem} mr-2`}>
            <a className={`${styles.link} + ${item.style} pt-4 pb-4 pl-5 pr-5`}>
              {item.icon}
              <span className={`${styles.text} ml-2`}>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  navbarData: PropTypes.arrayOf(PropTypes.shape(navbarDataShape)),
};

export default Navbar;
