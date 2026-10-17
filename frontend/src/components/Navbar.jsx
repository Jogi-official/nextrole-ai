import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className="flex flex-row justify-between">
      <div className="flex flex-row gap-3 items-center p-4 font-semibold text-lg">
        <img src="logo.svg" alt="Logo" height="40" width="40" />
        NextRole.AI
      </div>
      <div className="right ">
        <ul className="flex flex-row gap-4 mr-1 p-4 text-lg font-semibold">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
