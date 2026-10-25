import Logo from "./Logo";
import Profile from "./Profile";
import SectionNavigator from "./SectionNavigator";
function Navbar() {
  return (
    <nav className="flex flex-row flex-wrap items-center justify-between border-b border-slate-200 bg-white px-4 pt-3 md:h-20 md:flex-nowrap md:px-8 md:pt-0">
      <Logo />
      <SectionNavigator />
      <Profile />
    </nav>
  );
}

export default Navbar;
