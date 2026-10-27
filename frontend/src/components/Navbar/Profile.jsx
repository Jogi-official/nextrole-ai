import { Link } from "react-router";
import { getInitials, useProfile } from "../../context/ProfileContext";
import Icon from "../Icon";

function Profile() {
  const { profile } = useProfile();

  return (
    <Link to="/profile" className="flex flex-row items-center gap-2 md:gap-3">
      {profile.photo ? (
        <img
          src={profile.photo}
          alt=""
          className="h-9 w-9 rounded-full object-cover md:h-10 md:w-10"
        />
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-600 text-sm font-semibold text-white md:h-10 md:w-10">
          {getInitials(profile.name)}
        </span>
      )}
      <span className="hidden max-w-40 truncate text-[15px] text-slate-700 sm:inline">
        {profile.name}
      </span>
      <Icon name="chevronDown" className="h-4 w-4 text-slate-500" />
    </Link>
  );
}

export default Profile;
