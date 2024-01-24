import { useState, useRef } from "react";
import styles from "./app.module.css";

function App() {


const titleRef = useRef()
  return (
    <div className={styles.app}>
      <h1 ref={titleRef} className={styles.title}>Бургерная</h1>
    </div>
  );
}

export default App;
