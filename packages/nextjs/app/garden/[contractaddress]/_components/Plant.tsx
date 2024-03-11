"use client";

import { useState } from "react";
import Image from "next/image";
import Menu from "./Menu";

const flowerImages = [
  "/assets/flowerLv1.png",
  "/assets/flowerLv1.png",
  "/assets/flowerLv2.png",
  "/assets/flowerLv3.png",
  "/flowerLv3.png",
];

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
        className={`w-20 h-20 flex items-center justify-center font-bold relative cursor-pointer ${
          currentTime > Number(item.waterdate) && Number(item.waterdate) !== 0 ? "bg-red-200" : "bg-transparent"
        }`}
        onClick={handleToggleDropdown}
      >
        {item.content === "0" && <Image alt="Seed" width={50} height={50} src="/assets/seed.png" />}
        {item.content === "G" && <Image alt="Flower" width={50} height={50} src={flowerImages[item.level]} />}
        {item.content === "x" && <Image alt="Empty" width={50} height={50} src="/disappear.png" />}
        {Number(item.level) > 0 && <p className="absolute top-[40px] text-white">Lv {Number(item.level)}</p>}
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
