import Icon from "../Icon";

const sections = [
  { name: "Home", icon: "home", active: true },
  { name: "Saved", icon: "bookmark" },
  { name: "Profile", icon: "user" },
];

function SectionNavigator() {
  return (
    <div className="order-last mt-2 flex w-full flex-row justify-around md:order-none md:mt-0 md:h-full md:w-auto md:justify-center md:gap-2">
      {sections.map((section) => (
        <a
          key={section.name}
          href=""
          className={`flex flex-1 flex-row items-center justify-center gap-2 border-b-2 px-3 py-3 text-sm transition md:h-full md:flex-none md:px-5 md:py-0 md:text-[15px] ${
            section.active
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Icon name={section.icon} className="h-5 w-5" />
          {section.name}
        </a>
      ))}
    </div>
  );
}

export default SectionNavigator;
