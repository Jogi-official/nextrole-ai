import JobDetails from "./components/JobDetails";
import JobListings from "./components/JobListings";
import Sidebar from "./components/Sidebar";
import styles from "./main.module.css";

function Main() {
  return (
    <div className={styles.main}>
      <div id="sidebar" className={styles.sidebar}>
        <Sidebar />
      </div>
      <div id="listArea" className={styles.listArea}>
        <JobListings />
      </div>
      <div id="selectedArea" className={styles.selectedArea}>
        <JobDetails />
      </div>
    </div>
  );
}

export default Main;
