"use client";

import { useState } from "react";
import Menu from "./Menu";

type ItemInfo = {
  id: number;
  contractaddress: string;
  item: any;
  currentTime: number;
  owner: string;
  useraddress: string;
};

const Plant = ({ id, contractaddress, item, currentTime, owner, useraddress }: ItemInfo) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div
        className={`w-20 h-20 border border-gray-300 flex items-center justify-center font-bold relativecursor-pointer ${
          currentTime > Number(item.waterdate) && Number(item.waterdate) !== 0 ? "bg-red-200" : "bg-white"
        }`}
        onClick={handleToggleDropdown}
      >
        {item.content}
        <Menu
          id={id}
          contractaddress={contractaddress}
          content={item.content}
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          owner={owner}
          useraddress={useraddress}
        />
      </div>
    </>
  );
};

export default Plant;
