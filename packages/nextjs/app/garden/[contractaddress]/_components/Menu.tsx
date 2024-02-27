"use client";

import { useContractWrite } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { notification } from "~~/utils/scaffold-eth";

type MenuInfo = {
  id: number;
  contractaddress: string;
  isOpen: any;
  onClose: any;
};

const Menu = ({ id, contractaddress, isOpen, onClose }: MenuInfo) => {
  const { writeAsync: plantSeed } = useContractWrite({
    address: contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "plantSeed",
    args: [BigInt(id)],
  });

  const plant = async () => {
    await plantSeed();
    notification.success("Seed is planted");
  };
  return (
    <>
      <div className="relative">
        {isOpen && (
          <div className="absolute z-10 -mt-7 ml-6 bg-white rounded shadow-md">
            <ul>
              <li className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => plant()}>
                Plant
              </li>
              <li className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => onClose()}>
                Cancel
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
