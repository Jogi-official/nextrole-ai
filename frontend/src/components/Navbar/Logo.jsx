function Logo() {
  return (
    <div className="p-4 ml-2">
      <a href="" className=" flex flex-row">
        <img src="./logo.svg" alt="Logo" height="30" width="30" />
        <div className="ml-3 flex flex-col">
          <span className="text-lg font-semibold">NextRole.ai</span>
          <span className="text-gray-500  ">Smarter Jobs Better Role</span>
        </div>
      </a>
    </div>
  );
}

export default Logo;
