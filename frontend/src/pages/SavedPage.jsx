import { Link } from "react-router";
import Icon, { VerifiedBadge } from "../components/Icon";
import CompanyLogo from "../components/Main/components/CompanyLogo";
import { useSavedJobs } from "../context/SavedJobsContext";
import { jobs } from "../data/jobs";

function SavedPage() {
  const { savedIds, toggleSave } = useSavedJobs();
  const savedJobs = jobs.filter((job) => savedIds.includes(job.id));

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f5f7fb] p-4 text-slate-800 sm:p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-1 flex items-center gap-3 text-xl font-semibold text-slate-900">
          <Icon name="bookmark" className="h-5 w-5 text-blue-600" />
          Saved Jobs
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          {savedJobs.length === 0
            ? "Jobs you bookmark will show up here."
            : `You have ${savedJobs.length} saved ${savedJobs.length === 1 ? "job" : "jobs"}.`}
        </p>

        {savedJobs.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Icon name="bookmark" className="h-6 w-6" />
            </div>
            <h2 className="text-base font-semibold text-slate-900">No saved jobs yet</h2>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Tap the bookmark icon on any job to save it for later.
            </p>
            <Link
              to="/"
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Browse jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <article
                key={job.id}
                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-4"
              >
                <CompanyLogo company={job.company} size="h-11 w-11 sm:h-14 sm:w-14" />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[15px] font-semibold leading-6 text-slate-900 sm:text-[17px]">
                      {job.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600 sm:px-3 sm:text-xs">
                      {job.match}% match
                    </span>
                  </div>

                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
                    {job.company}
                    <VerifiedBadge />
                  </p>

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

                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-slate-500">
                      <Icon name="calendar" className="h-3.5 w-3.5" />
                      {job.posted}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleSave(job.id)}
                        className="rounded-md px-2 py-1 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        Remove
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default SavedPage;
