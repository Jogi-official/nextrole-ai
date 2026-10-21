import { useState } from "react";
import styles from "./sidebar.module.css";

function Sidebar() {
  const [jobTypes, setJobTypes] = useState(["Full-time", "Remote"]);

  const [experience, setExperience] = useState(["Mid Level"]);

  const [location, setLocation] = useState("Any location");
  const [skills, setSkills] = useState("");
  const [quickFilters, setQuickFilters] = useState([]);

  const toggleItem = (value, list, setList) => {
    setList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  return (
    <aside className={styles.sidebar}>
      {/* Location */}
      <div className={styles.locationSection}>
        <h3 className={styles.sectionTitle}>
          <svg viewBox="0 0 24 24">
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          Location
        </h3>

        <div className={styles.locationDropdown}>
          <svg viewBox="0 0 24 24">
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Location"
          >
            <option>Any location</option>
            <option>Remote</option>
            <option>New York</option>
            <option>London</option>
            <option>San Francisco</option>
          </select>
        </div>
      </div>

      {/* Job Type */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <svg viewBox="0 0 24 24">
            <rect x="4" y="7" width="16" height="13" rx="2" />
            <path d="M9 7V4h6v3M4 12h16M10 12v2h4v-2" />
          </svg>
          Job Type
        </h3>

        {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
          <label className={styles.checkboxOption} key={type}>
            <input
              type="checkbox"
              checked={jobTypes.includes(type)}
              onChange={() => toggleItem(type, jobTypes, setJobTypes)}
            />
            <span>{type}</span>
          </label>
        ))}
      </section>

      {/* Experience Level */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <svg viewBox="0 0 24 24">
            <path d="M12 3 5 8v5c0 4 3 6.5 7 8 4-1.5 7-4 7-8V8l-7-5Z" />
            <circle cx="12" cy="11" r="3" />
            <path d="M12 8v3l2 1" />
          </svg>
          Experience Level
        </h3>

        {["Entry Level", "Mid Level", "Senior Level"].map((level) => (
          <label className={styles.checkboxOption} key={level}>
            <input
              type="checkbox"
              checked={experience.includes(level)}
              onChange={() => toggleItem(level, experience, setExperience)}
            />
            <span>{level}</span>
          </label>
        ))}
      </section>

      {/* Skills */}
      <section className={styles.skillsSection}>
        <h3 className={styles.sectionTitle}>
          <svg viewBox="0 0 24 24">
            <path d="M20 13 11 22 2 13V4h9l9 9Z" />
            <circle cx="7" cy="9" r="1.5" />
          </svg>
          Skills
        </h3>

        <input
          className={styles.skillsInput}
          type="text"
          placeholder="Add skills (e.g. React, Node.js...)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </section>

      {/* Search Jobs */}
      <button
        className={styles.searchButton}
        onClick={() =>
          console.log({
            location,
            jobTypes,
            experience,
            skills,
            quickFilters,
          })
        }
      >
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 5 5" />
        </svg>
        Search Jobs
      </button>

      <div className={styles.divider} />

      {/* Quick Filters */}
      <section className={styles.quickSection}>
        <h3 className={styles.quickTitle}>Quick Filters</h3>

        <button
          className={`${styles.filterChip} ${
            quickFilters.includes("Remote") ? styles.activeChip : ""
          }`}
          onClick={() => toggleItem("Remote", quickFilters, setQuickFilters)}
        >
          <svg viewBox="0 0 24 24" className={styles.homeIcon}>
            <path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6" />
          </svg>
          Remote
        </button>

        <button
          className={`${styles.filterChip} ${
            quickFilters.includes("High Match") ? styles.activeChip : ""
          }`}
          onClick={() =>
            toggleItem("High Match", quickFilters, setQuickFilters)
          }
        >
          <svg viewBox="0 0 24 24" className={styles.starIcon}>
            <path d="m12 2 3 6 7 .9-5 4.8 1.2 7L12 17.4l-6.2 3.3 1.2-7-5-4.8L9 8l3-6Z" />
          </svg>
          High Match
        </button>

        <button
          className={`${styles.filterChip} ${
            quickFilters.includes("Newly Posted") ? styles.activeChip : ""
          }`}
          onClick={() =>
            toggleItem("Newly Posted", quickFilters, setQuickFilters)
          }
        >
          <svg viewBox="0 0 24 24" className={styles.boltIcon}>
            <path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z" />
          </svg>
          Newly Posted
        </button>
      </section>

      {/* AI Card */}
      <div className={styles.aiCard}>
        <div className={styles.aiIcon}>
          <svg viewBox="0 0 24 24">
            <path d="M12 3a4 4 0 0 0-4 4v1a4 4 0 0 0-3 4v2a4 4 0 0 0 4 4h3V3Z" />
            <path d="M12 3a4 4 0 0 1 4 4v1a4 4 0 0 1 3 4v2a4 4 0 0 1-4 4h-3V3Z" />
            <path d="M8 8h4m-7 5h4m7-5h-4m7 5h-4M9 17v3m6-3v3" />
          </svg>
        </div>

        <h4>
          Let AI find the best
          <br />
          jobs for you
        </h4>

        <p>
          We analyze job descriptions and match them with your skills and goals.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
