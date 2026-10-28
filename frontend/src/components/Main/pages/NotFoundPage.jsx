import { Link, useLocation, useNavigate } from "react-router";
import Icon from "../../Icon";

function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#f5f7fb] px-4 py-12 text-slate-800">
      {/* Soft background blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white/80 px-6 py-12 text-center shadow-xl shadow-blue-100/50 backdrop-blur sm:px-10">
        {/* Compass illustration */}
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-60 [animation-duration:2.5s]" />
          <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-300/50">
            <Icon name="compass" className="h-11 w-11" strokeWidth={1.75} />
          </span>
        </div>

        <p className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl">
          404
        </p>
        <h1 className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">
          This page took a different career path
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          We couldn't find anything at{" "}
          <code className="break-all rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-700">
            {location.pathname}
          </code>
          . It may have moved, or the link might be wrong.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <Icon name="home" className="h-4 w-4" />
            Back to jobs
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
          >
            <Icon name="arrowLeft" className="h-4 w-4" />
            Go back
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 border-t border-slate-100 pt-6 text-sm">
          <Link to="/saved" className="flex items-center gap-1.5 text-slate-500 transition hover:text-blue-600">
            <Icon name="bookmark" className="h-4 w-4" />
            Saved jobs
          </Link>
          <span className="text-slate-300">·</span>
          <Link to="/profile" className="flex items-center gap-1.5 text-slate-500 transition hover:text-blue-600">
            <Icon name="user" className="h-4 w-4" />
            Profile
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
