function SectionNavigator() {
  return (
    <div className={`flex flex-row gap-4`}>
      <div className="home ">
        <a href="#" class="flex flex-row items-center">
          <img src="./home.svg" alt="" height="40" width="40" />
          <span className="ml-2 text-lg text-gray-400">Home</span>
        </a>
      </div>
      <div className="saved">
        <a href="" class="flex flex-row items-center">
          <img src="./saved.svg" alt="" height="40" width="40" />
          <span className="ml-2 text-lg text-gray-400">Saved</span>
        </a>
      </div>
      <div className="profile">
        <a href="" class="flex flex-row items-center">
          <img src="./Profile.svg" alt="" height="40" width="40" />
          <span className="ml-2 text-lg text-gray-400">Profile</span>
        </a>
      </div>
    </div>
  );
}

export default SectionNavigator;
