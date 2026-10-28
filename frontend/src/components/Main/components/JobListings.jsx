import { useState } from "react";
import Icon, { VerifiedBadge } from "../../Icon";
import CompanyLogo from "./CompanyLogo";
import { jobs } from "../../../data/jobs";
import { useSavedJobs } from "../../../context/SavedJobsContext";

const MAX_VISIBLE_SKILLS = 4;

// True if the search text appears in the job's title, company, or any skill.
function matchesSearch(job, query) {
  const text = [job.title, job.company, ...job.skills].join(" ").toLowerCase();
  return text.includes(query);
}

export default function JobListings({ search = "", onClearSearch }) {
  const [selectedJob, setSelectedJob] = useState(1);
  const { isSaved: isJobSaved, toggleSave } = useSavedJobs();
  const [sortBy, setSortBy] = useState("Best Match");

  const query = search.trim().toLowerCase();
  const filteredJobs = query
    ? jobs.filter((job) => matchesSearch(job, query))
    : jobs;

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "Best Match") return b.match - a.match;
    if (sortBy === "Company A-Z") return a.company.localeCompare(b.company);
    return a.title.localeCompare(b.title);
  });

  return (
    <section className="min-w-0 p-3 text-slate-800 sm:p-4">
      {/* Results header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <h2 className="flex items-center gap-3 text-base font-semibold sm:text-lg text-slate-900">
          <Icon name="sparkles" className="h-5 w-5 text-blue-600" />
          Found {sortedJobs.length} {sortedJobs.length === 1 ? "job" : "jobs"}
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

      {/* Empty state: the search matched nothing */}
      {sortedJobs.length === 0 && (
        <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="relative mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Icon name="search" className="h-7 w-7" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-rose-100 text-rose-500">
              <Icon name="x" className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </div>
          <h3 className="text-base font-semibold text-slate-900">No jobs found</h3>
          <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
            Nothing matches{" "}
            <span className="font-medium text-slate-700">"{search.trim()}"</span>.
            Try a different job title, company, or skill.
          </p>
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Job cards */}
      <div className="space-y-4">
        {sortedJobs.map((job) => {
          const isSelected = selectedJob === job.id;
          const isSaved = isJobSaved(job.id);
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
