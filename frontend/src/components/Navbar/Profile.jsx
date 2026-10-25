import Icon from "../Icon";

function Profile() {
  return (
    <a href="" className="flex flex-row items-center gap-2 md:gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-600 text-sm font-semibold text-white md:h-10 md:w-10">
        AK
      </span>
      <span className="hidden text-[15px] text-slate-700 sm:inline">Akki</span>
      <Icon name="chevronDown" className="h-4 w-4 text-slate-500" />
    </a>
  );
}

export default Profile;
