import styles from "./navbar.module.css";

function Navbar({ data }) {

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {data.map((item) => (
          <li key={item.id} className={`${styles.listItem} mr-2 pt-4 pb-4 pl-5 pr-5`}>
            <a className={`${styles.link} + ${item.style} `}>
              {item.icon}
              <span className="ml-2">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default Navbar;
