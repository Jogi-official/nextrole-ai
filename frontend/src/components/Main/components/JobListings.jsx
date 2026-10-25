import { useState } from "react";
import Icon, { VerifiedBadge } from "../../Icon";
import CompanyLogo from "./CompanyLogo";

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer (AI)",
    company: "Microsoft",
    location: "Remote",
    experience: "5+ years",
    type: "Full-time",
    level: "Senior Level",
    match: 92,
    description:
      "Join our AI team to build next-generation AI products using Python, Azure, and modern web technologies. Experience with LLMs, RAG and cloud architecture is a plus.",
    skills: ["Python", "Azure", "React", "TypeScript", "LLMs", "RAG"],
    posted: "Posted 2 days ago",
  },
  {
    id: 2,
    title: "Frontend Developer (React)",
    company: "Google",
    location: "Remote",
    experience: "3+ years",
    type: "Full-time",
    level: "Mid Level",
    match: 88,
    description:
      "Work on products that impact billions of users. We are looking for a skilled React developer with strong JavaScript and TypeScript experience.",
    skills: ["React", "TypeScript", "JavaScript", "CSS"],
    posted: "Posted 3 days ago",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Remote",
    experience: "3+ years",
    type: "Full-time",
    level: "Mid Level",
    match: 82,
    description:
      "Build and maintain web applications using React, Node.js and AWS. Experience with databases and REST APIs is required.",
    skills: ["React", "Node.js", "AWS", "JavaScript"],
    posted: "Posted 1 day ago",
  },
  {
    id: 4,
    title: "Software Engineer (Backend)",
    company: "Apple",
    location: "Remote",
    experience: "3+ years",
    type: "Full-time",
    level: "Mid Level",
    match: 78,
    description:
      "Join our backend team to build scalable services using Python, FastAPI and cloud technologies.",
    skills: ["Python", "FastAPI", "AWS", "Docker"],
    posted: "Posted 4 days ago",
  },
];

const MAX_VISIBLE_SKILLS = 4;

export default function JobListings() {
  const [selectedJob, setSelectedJob] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const [sortBy, setSortBy] = useState("Best Match");

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === "Best Match") return b.match - a.match;
    if (sortBy === "Company A-Z") return a.company.localeCompare(b.company);
    return a.title.localeCompare(b.title);
  });

  function toggleSave(id) {
    setSavedJobs((previous) =>
      previous.includes(id)
        ? previous.filter((jobId) => jobId !== id)
        : [...previous, id],
    );
  }

  return (
    <section className="min-w-0 p-3 text-slate-800 sm:p-4">
      {/* Results header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <h2 className="flex items-center gap-3 text-base font-semibold sm:text-lg text-slate-900">
          <Icon name="sparkles" className="h-5 w-5 text-blue-600" />
          Found {jobs.length} jobs
        </h2>

        <label className="relative flex items-center gap-1 rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm shadow-sm">
          <span className="text-slate-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="cursor-pointer appearance-none bg-transparent font-medium text-slate-800 outline-none"
          >
            <option value="Best Match">Most Relevant</option>
            <option value="Company A-Z">Company A-Z</option>
            <option value="Job Title">Job Title</option>
          </select>
          <Icon
            name="chevronDown"
            className="pointer-events-none absolute right-2.5 h-4 w-4 text-slate-500"
          />
        </label>
      </div>

      {/* Job cards */}
      <div className="space-y-4">
        {sortedJobs.map((job) => {
          const isSelected = selectedJob === job.id;
          const isSaved = savedJobs.includes(job.id);
          const visibleSkills = job.skills.slice(0, MAX_VISIBLE_SKILLS);
          const hiddenCount = job.skills.length - visibleSkills.length;

          return (
            <article
              key={job.id}
              onClick={() => setSelectedJob(job.id)}
              className={`flex cursor-pointer gap-3 rounded-xl border p-3 sm:gap-4 sm:p-4 transition duration-200 hover:border-blue-300 hover:shadow-md ${
                isSelected
                  ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                  : "border-slate-200 bg-white"
              }`}
            >
              <CompanyLogo
                company={job.company}
                size="h-11 w-11 sm:h-14 sm:w-14"
              />

              <div className="min-w-0 flex-1">
                {/* Job title and match */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-semibold leading-6 text-slate-900 sm:text-[17px]">
                    {job.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[11px] sm:px-3 sm:text-xs font-semibold text-emerald-600">
                    {job.match}% match
                  </span>
                </div>

                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600 sm:text-[15px]">
                  {job.company}
                  <VerifiedBadge />
                </p>

                {/* Job information */}
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Icon name="mapPin" className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="briefcase" className="h-3.5 w-3.5" />
                    {job.type}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="level" className="h-3.5 w-3.5" />
                    {job.level}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {visibleSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600"
                    >
                      {skill}
                    </span>
                  ))}
                  {hiddenCount > 0 && (
                    <span className="rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-600">
                      +{hiddenCount}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-slate-500">
                    <Icon name="calendar" className="h-3.5 w-3.5" />
                    {job.posted}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={isSaved ? "Unsave job" : "Save job"}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleSave(job.id);
                      }}
                      className={`rounded-md p-1.5 transition hover:bg-blue-50 ${
                        isSaved ? "text-blue-600" : "text-slate-400"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill={isSaved ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      >
                        <path d="M6 3h12v18l-6-4-6 4V3Z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      <Icon name="externalLink" className="h-4 w-4" />
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
