import styles from "./preloader.module.css";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__container}>
        <span className={styles.preloader__round}></span>
      </div>
    </div>
  );
};

export default Preloader;
