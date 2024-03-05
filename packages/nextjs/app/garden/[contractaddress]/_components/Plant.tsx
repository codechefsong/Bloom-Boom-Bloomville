"use client";

import { useState } from "react";
import Image from "next/image";
import Menu from "./Menu";

const flowerImages = ["/flower.png", "/flowerlv1.png", "/flowerlv2.png", "/flowerlv3.png", "/flowerlv3.png"];

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
        className={`w-20 h-20 border border-lime-700 flex items-center justify-center font-bold relative cursor-pointer ${
          currentTime > Number(item.waterdate) && Number(item.waterdate) !== 0 ? "bg-red-200" : "bg-green-100"
        }`}
        onClick={handleToggleDropdown}
      >
        {item.content === "0" && <Image alt="Seed" width={25} height={25} src="/seed.png" />}
        {item.content === "G" && <Image alt="Flower" width={60} height={60} src={flowerImages[item.level]} />}
        {item.content === "x" && <Image alt="Empty" width={50} height={50} src="/disappear.png" />}
        {Number(item.level) > 0 && <p className="absolute top-[40px]">Lv {Number(item.level)}</p>}
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
