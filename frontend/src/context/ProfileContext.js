import { createContext, useContext } from "react";

// Shared user profile (name, photo, "about me" prompt), provided by <ProfileProvider>.
export const ProfileContext = createContext(null);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used inside <ProfileProvider>");
  }
  return context;
}

export function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
