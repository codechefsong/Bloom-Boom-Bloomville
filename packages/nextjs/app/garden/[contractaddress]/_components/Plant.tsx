import { useState } from "react";
import Menu from "./Menu";

type ItemInfo = {
  id: number;
  contractaddress: string;
  item: any;
};

const Plant = ({ id, contractaddress, item }: ItemInfo) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div
        className="w-20 h-20 border border-gray-300 flex items-center justify-center font-bold relative bg-white cursor-pointer"
        onClick={handleToggleDropdown}
      >
        {item.content}
        <Menu
          id={id}
          contractaddress={contractaddress}
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
        />
      </div>
    </>
  );
};

export default Plant;
