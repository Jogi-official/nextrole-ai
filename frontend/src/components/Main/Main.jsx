import Sidebar from "./components/Sidebar";
import styles from "./main.module.css";

function Main() {
  return (
    <div className={styles.main}>
      <div id="sidebar" className={styles.sidebar}>
        <Sidebar />
      </div>
      <div id="listArea" className={styles.listArea}>
        List Area content
      </div>
      <div id="selectedArea" className={styles.selectedArea}>
        Selected Area content
      </div>
    </div>
  );
}

export default Main;
