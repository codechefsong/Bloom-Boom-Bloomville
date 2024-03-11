"use client";

import { useState } from "react";
import Image from "next/image";
import Menu from "./Menu";

const flowerImages = [
  "/assets/flowerLv1.png",
  "/assets/flowerLv1.png",
  "/assets/flowerLv2.png",
  "/assets/flowerLv3.png",
  "/assets/flowerLv3.png",
];

const flowerWiltedImages = [
  "/assets/flowerLv1Wilted.png",
  "/assets/flowerLv1Wilted.png",
  "/assets/flowerLv2Wilted.png",
  "/assets/flowerLv3Wilted.png",
  "/assets/flowerLv3Wilted.png",
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
        className="w-20 h-20 flex items-center justify-center font-bold relative cursor-pointer"
        onClick={handleToggleDropdown}
      >
        {item.content === "0" && <Image alt="Seed" width={50} height={50} src="/assets/seed.png" />}
        {item.content === "G" && (
          <Image
            className="z-10"
            alt="Flower"
            width={50}
            height={50}
            src={
              currentTime > Number(item.waterdate) && Number(item.waterdate) !== 0
                ? flowerWiltedImages[item.level]
                : flowerImages[item.level]
            }
          />
        )}
        {item.content === "x" && <Image alt="Empty" width={50} height={50} src="/disappear.png" />}
        {Number(item.level) > 0 && <p className="absolute top-[40px] z-20 text-white">Lv {Number(item.level)}</p>}
        {currentTime > Number(item.waterdate) && Number(item.waterdate) !== 0 && (
          <Image
            className="absolute top-1 left-1"
            alt="Water Icon"
            width={25}
            height={25}
            src="/assets/watericon.png"
          />
        )}
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
