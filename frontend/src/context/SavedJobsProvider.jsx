import { useEffect, useState } from "react";
import { SavedJobsContext } from "./SavedJobsContext";
import { loadFromStorage, saveToStorage } from "./storage";

const STORAGE_KEY = "nextrole.savedJobs";

// Temporary: kept in localStorage until the API has /api/saved (README Phase 1).
function SavedJobsProvider({ children }) {
  const [savedIds, setSavedIds] = useState(() => loadFromStorage(STORAGE_KEY, []));

  useEffect(() => {
    saveToStorage(STORAGE_KEY, savedIds);
  }, [savedIds]);

  function isSaved(id) {
    return savedIds.includes(id);
  }

  function toggleSave(id) {
    setSavedIds((previous) =>
      previous.includes(id)
        ? previous.filter((jobId) => jobId !== id)
        : [...previous, id],
    );
  }

  return (
    <SavedJobsContext.Provider value={{ savedIds, isSaved, toggleSave }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export default SavedJobsProvider;
