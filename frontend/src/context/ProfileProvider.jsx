import { useState } from "react";
import { ProfileContext } from "./ProfileContext";
import { loadFromStorage, saveToStorage } from "./storage";

const STORAGE_KEY = "nextrole.profile";

const DEFAULT_PROFILE = {
  name: "Akki",
  photo: null, // data URL of the uploaded image, or null to show initials
  about: "",
};

// Temporary: kept in localStorage until the API has /api/profile (README Phase 1).
function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => ({
    ...DEFAULT_PROFILE,
    ...loadFromStorage(STORAGE_KEY, {}),
  }));

  // Returns false if the browser refused to store it (e.g. image too large).
  function saveProfile(nextProfile) {
    const stored = saveToStorage(STORAGE_KEY, nextProfile);
    setProfile(nextProfile);
    return stored;
  }

  return (
    <ProfileContext.Provider value={{ profile, saveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;
