import Icon from "../Icon";

function Logo() {
  return (
    <a href="" className="flex flex-row items-center gap-3 md:gap-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/30 md:h-11 md:w-11">
        <Icon name="sparkles" className="h-5 w-5 md:h-6 md:w-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-semibold leading-6 text-slate-900 md:text-lg">
          NextRole.ai
        </span>
        <span className="hidden text-sm text-slate-600 sm:block">
          Smarter Jobs Better Role
        </span>
      </div>
    </a>
  );
}

export default Logo;
