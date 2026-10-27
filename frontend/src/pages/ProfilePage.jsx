import { useRef, useState } from "react";
import Icon from "../components/Icon";
import { getInitials, useProfile } from "../context/ProfileContext";

const MAX_ABOUT_LENGTH = 2000;
const MAX_PHOTO_MB = 5;
const MAX_RESUME_MB = 5;
const PHOTO_SIZE_PX = 256;
const RESUME_TYPES = [".pdf", ".doc", ".docx"];

// Shrinks the photo to a 256x256 square (center crop) so it fits in localStorage.
function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const side = Math.min(image.width, image.height);
      const canvas = document.createElement("canvas");
      canvas.width = PHOTO_SIZE_PX;
      canvas.height = PHOTO_SIZE_PX;
      canvas
        .getContext("2d")
        .drawImage(
          image,
          (image.width - side) / 2,
          (image.height - side) / 2,
          side,
          side,
          0,
          0,
          PHOTO_SIZE_PX,
          PHOTO_SIZE_PX,
        );
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image."));
    };
    image.src = url;
  });
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ProfilePage() {
  const { profile, saveProfile } = useProfile();

  // Edits go into a draft first; the navbar only changes when you press Save.
  const [draft, setDraft] = useState(profile);
  const [status, setStatus] = useState(null); // { type: "success" | "error", text }
  const [resume, setResume] = useState(null); // UI only for now, not uploaded anywhere
  const [isDragging, setIsDragging] = useState(false);

  const photoInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const hasChanges =
    draft.name !== profile.name ||
    draft.photo !== profile.photo ||
    draft.about !== profile.about;

  function updateDraft(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setStatus(null);
  }

  async function handlePhotoChange(event) {
    const file = event.target.files[0];
    event.target.value = ""; // lets you pick the same file again later
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus({ type: "error", text: "Please choose an image file (JPG, PNG, WebP…)." });
      return;
    }
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
      setStatus({ type: "error", text: `Image must be under ${MAX_PHOTO_MB} MB.` });
      return;
    }

    try {
      updateDraft("photo", await resizeImage(file));
    } catch (error) {
      setStatus({ type: "error", text: error.message });
    }
  }

  function pickResume(file) {
    if (!file) return;

    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!RESUME_TYPES.includes(extension)) {
      setStatus({ type: "error", text: "Resume must be a PDF or Word document." });
      return;
    }
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      setStatus({ type: "error", text: `Resume must be under ${MAX_RESUME_MB} MB.` });
      return;
    }

    setResume(file);
    setStatus(null);
  }

  function handleResumeDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    pickResume(event.dataTransfer.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = draft.name.trim();
    if (!name) {
      setStatus({ type: "error", text: "Name can't be empty." });
      return;
    }

    const nextProfile = { ...draft, name };
    setDraft(nextProfile);
    const stored = saveProfile(nextProfile);
    setStatus(
      stored
        ? { type: "success", text: "Profile saved." }
        : { type: "error", text: "Saved for this visit, but the browser couldn't store it." },
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f5f7fb] p-4 text-slate-800 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-1 flex items-center gap-3 text-xl font-semibold text-slate-900">
          <Icon name="user" className="h-5 w-5 text-blue-600" />
          Your Profile
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          This is what we use to find jobs and score how well they match you.
        </p>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* Left: basic info + about me */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            {/* Photo */}
            <div className="flex flex-wrap items-center gap-5">
              {draft.photo ? (
                <img
                  src={draft.photo}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-slate-100"
                />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-600 text-2xl font-semibold text-white">
                  {getInitials(draft.name)}
                </span>
              )}

              <div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => photoInputRef.current.click()}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                  >
                    Upload photo
                  </button>
                  {draft.photo && (
                    <button
                      type="button"
                      onClick={() => updateDraft("photo", null)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  JPG, PNG or WebP, up to {MAX_PHOTO_MB} MB.
                </p>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Name */}
            <label className="mt-6 block">
              <span className="text-sm font-semibold text-slate-900">Display name</span>
              <input
                type="text"
                value={draft.name}
                onChange={(event) => updateDraft("name", event.target.value)}
                maxLength={60}
                placeholder="Your name"
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            {/* About me prompt */}
            <label className="mt-6 block">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Icon name="sparkles" className="h-4 w-4 text-blue-600" />
                Describe yourself
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                Our AI reads this to find jobs and calculate your match score. Mention your
                skills, years of experience, the roles you want, and where you'd like to work.
              </span>
              <textarea
                value={draft.about}
                onChange={(event) => updateDraft("about", event.target.value)}
                maxLength={MAX_ABOUT_LENGTH}
                rows={9}
                placeholder="e.g. I'm a frontend developer with 3 years of experience in React and TypeScript. I'm learning Python and LLMs and want a remote, mid-level role on an AI product team…"
                className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <span className="mt-1 block text-right text-xs text-slate-400">
                {draft.about.length} / {MAX_ABOUT_LENGTH}
              </span>
            </label>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
              {status && (
                <span
                  role="status"
                  className={`mr-auto flex items-center gap-1.5 text-sm ${
                    status.type === "success" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  <Icon name={status.type === "success" ? "check" : "info"} className="h-4 w-4" />
                  {status.text}
                </span>
              )}
              <button
                type="button"
                disabled={!hasChanges}
                onClick={() => {
                  setDraft(profile);
                  setStatus(null);
                }}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!hasChanges}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save changes
              </button>
            </div>
          </form>

          {/* Right: resume (UI only) */}
          <section className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-sm font-semibold text-slate-900">Resume</h2>
            <p className="mt-1 text-xs text-slate-500">
              Add your resume so we can match you more accurately.
            </p>

            {resume ? (
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold uppercase text-blue-600">
                  {resume.name.split(".").pop()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{resume.name}</p>
                  <p className="text-xs text-slate-500">{formatFileSize(resume.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setResume(null)}
                  className="rounded-md px-2 py-1 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => resumeInputRef.current.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleResumeDrop}
                className={`mt-4 flex w-full flex-col items-center rounded-lg border-2 border-dashed px-4 py-10 text-center transition ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                }`}
              >
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon name="briefcase" className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-slate-900">
                  Drop your resume here, or <span className="text-blue-600">browse</span>
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  PDF or Word, up to {MAX_RESUME_MB} MB
                </span>
              </button>
            )}

            <input
              ref={resumeInputRef}
              type="file"
              accept={RESUME_TYPES.join(",")}
              onChange={(event) => {
                pickResume(event.target.files[0]);
                event.target.value = "";
              }}
              className="hidden"
            />

            <p className="mt-4 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
              <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
              Resume upload is coming soon. For now, your file stays in this browser tab and
              isn't sent anywhere.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
