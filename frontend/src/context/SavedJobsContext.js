import { createContext, useContext } from "react";

// Shared list of saved job ids, provided by <SavedJobsProvider>.
export const SavedJobsContext = createContext(null);

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used inside <SavedJobsProvider>");
  }
  return context;
}
