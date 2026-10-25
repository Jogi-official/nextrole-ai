import { useState } from "react";
import Icon, { VerifiedBadge } from "../../Icon";
import CompanyLogo from "./CompanyLogo";

const jobDetails = {
  1: {
    title: "Senior Software Engineer (AI)",
    company: "Microsoft",
    location: "Remote",
    experience: "5+ years",
    type: "Full-time",
    level: "Senior Level",
    match: 92,
    description:
      "We are looking for a Senior Software Engineer to join our AI team and help build next-generation AI products using Python, Azure, and modern web technologies. You will work on scalable solutions, collaborate with cross-functional teams, and contribute to cutting-edge AI projects.",
    matchingSkills: ["Python", "React", "TypeScript", "Azure", "LLM / AI"],
    missingSkills: ["RAG", "Kubernetes", "System Design"],
    reasons: [
      "Strong match with your current skills (React, Python, TypeScript)",
      "Aligns with your goal of working in AI/ML",
      "Remote work flexibility",
      "Growth opportunities in Azure and cloud technologies",
    ],
    applyUrl: "https://careers.microsoft.com/",
  },
  2: {
    title: "Frontend Developer (React)",
    company: "Google",
    location: "Remote",
    experience: "3+ years",
    type: "Full-time",
    level: "Mid Level",
    match: 88,
    description:
      "Work on products that impact billions of users. Build fast, accessible interfaces with React and TypeScript, and collaborate closely with design and product teams.",
    matchingSkills: ["React", "TypeScript", "JavaScript", "CSS"],
    missingSkills: ["Web Performance", "Accessibility"],
    reasons: [
      "Strong match with your React and TypeScript experience",
      "Remote work flexibility",
      "Work on products used at massive scale",
    ],
    applyUrl: "https://careers.google.com/",
  },
  3: {
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Remote",
    experience: "3+ years",
    type: "Full-time",
    level: "Mid Level",
    match: 82,
    description:
      "Build and maintain web applications using React, Node.js and AWS. Design REST APIs and work with relational and NoSQL databases.",
    matchingSkills: ["React", "Node.js", "JavaScript"],
    missingSkills: ["AWS", "DynamoDB", "System Design"],
    reasons: [
      "Makes use of your existing full-stack experience",
      "Builds valuable cloud deployment experience",
      "Remote work flexibility",
    ],
    applyUrl: "https://www.amazon.jobs/",
  },
  4: {
    title: "Software Engineer (Backend)",
    company: "Apple",
    location: "Remote",
    experience: "3+ years",
    type: "Full-time",
    level: "Mid Level",
    match: 78,
    description:
      "Join our backend team to build scalable services using Python, FastAPI and cloud technologies.",
    matchingSkills: ["Python", "FastAPI", "Docker"],
    missingSkills: ["AWS", "Distributed Systems"],
    reasons: [
      "Uses your Python and API experience",
      "Provides exposure to large-scale backend systems",
      "Remote work flexibility",
    ],
    applyUrl: "https://www.apple.com/careers/",
  },
};

const RING_RADIUS = 34;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function JobDetails({ jobId = 1 }) {
  const [saved, setSaved] = useState(false);
  const job = jobDetails[jobId] || jobDetails[1];

  return (
    <aside className="min-w-0 p-4 text-slate-800 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          Back to results
        </button>

        <button
          type="button"
          onClick={() => setSaved(!saved)}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-blue-50 ${
            saved
              ? "border-blue-300 bg-blue-50 text-blue-700"
              : "border-slate-200 text-blue-600"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            <path d="M6 3h12v18l-6-4-6 4V3Z" />
          </svg>
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      {/* Job heading */}
      <div className="flex items-start gap-3 sm:gap-5">
        <CompanyLogo company={job.company} size="h-12 w-12 sm:h-16 sm:w-16" />

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold leading-7 text-slate-900 sm:text-xl">
            {job.title}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-[15px] text-slate-600">
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
        </div>
      </div>

      {/* Match score */}
      <section className="mt-6 flex items-center gap-3 rounded-xl bg-slate-50 p-3 sm:gap-4 sm:p-4">
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
            <circle
              cx="40"
              cy="40"
              r={RING_RADIUS}
              fill="none"
              stroke="#d1fae5"
              strokeWidth="7"
            />
            <circle
              cx="40"
              cy="40"
              r={RING_RADIUS}
              fill="none"
              stroke="#10b981"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - job.match / 100)}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-900">
            {job.match}%
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-emerald-700">Match Score</h3>
          <p className="mt-1 text-sm leading-5 text-slate-600">
            {job.match >= 90
              ? "Great match! This job aligns well with your skills and career goals."
              : job.match >= 80
                ? "Good potential match with some skills to strengthen."
                : "Worth exploring, but review the skill gaps before applying."}
          </p>
        </div>
      </section>

      {/* Matching skills */}
      <section className="mt-6">
        <h3 className="mb-3 text-[15px] font-semibold text-slate-900">
          Key Matching Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {job.matchingSkills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
            >
              <Icon name="check" className="h-3 w-3" strokeWidth={2.5} />
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Missing skills */}
      <section className="mt-6">
        <h3 className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          Missing Skills
          <Icon name="info" className="h-4 w-4 text-slate-400" />
        </h3>

        <div className="flex flex-wrap gap-2">
          {job.missingSkills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 rounded-md bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600"
            >
              <Icon name="check" className="h-3 w-3" strokeWidth={2.5} />
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="mt-7 border-t border-slate-200 pt-6">
        <h3 className="mb-3 text-[15px] font-semibold text-slate-900">
          Job Description
        </h3>

        <p className="text-[15px] leading-7 text-slate-600">
          {job.description}
        </p>
      </section>

      {/* Reasons */}
      <section className="mt-6 rounded-xl border border-slate-200 p-4 sm:p-5">
        <h3 className="mb-4 flex items-center gap-3 text-sm font-medium text-slate-800">
          <Icon name="sparkles" className="h-4 w-4 text-blue-600" />
          Why this is a great match
        </h3>

        <ul className="space-y-4">
          {job.reasons.map((reason) => (
            <li
              key={reason}
              className="flex items-start gap-3 text-sm leading-5 text-slate-600"
            >
              <Icon
                name="check"
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                strokeWidth={2.5}
              />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          Apply on {job.company}
          <Icon name="externalLink" className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={() => setSaved(!saved)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            <path d="M6 3h12v18l-6-4-6 4V3Z" />
          </svg>
          {saved ? "Job Saved" : "Save Job"}
        </button>
      </div>
    </aside>
  );
}
