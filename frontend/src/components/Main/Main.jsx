import { useState } from "react";
import JobDetails from "./components/JobDetails";
import JobListings from "./components/JobListings";
import Sidebar from "./components/Sidebar";
import styles from "./main.module.css";

function Main() {
  // Lives here (not in Sidebar) because both Sidebar and JobListings need it.
  const [search, setSearch] = useState("");

  return (
    <div className={styles.main}>
      <div id="sidebar" className={styles.sidebar}>
        <Sidebar search={search} onSearchChange={setSearch} />
      </div>
      <div id="listArea" className={styles.listArea}>
        <JobListings search={search} onClearSearch={() => setSearch("")} />
      </div>
      <div id="selectedArea" className={styles.selectedArea}>
        <JobDetails />
      </div>
    </div>
  );
}

export default Main;
