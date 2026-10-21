import Logo from "./Logo";
import Profile from "./Profile";
import SectionNavigator from "./SectionNavigator";
function Navbar() {
  return (
    <nav className="flex flex-row justify-between items-center">
      <Logo />
      <SectionNavigator />
      <Profile />
    </nav>
  );
}

export default Navbar;
