"use client";

import Image from "next/image";
import { useContractWrite } from "wagmi";
import { ChevronDoubleUpIcon, ScissorsIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DeployedContracts from "~~/contracts/deployedContracts";
import { getParsedError, notification } from "~~/utils/scaffold-eth";

type MenuInfo = {
  id: number;
  contractaddress: string;
  content: string;
  isOpen: any;
  onClose: any;
  owner: string;
  useraddress: string;
};

const Menu = ({ id, contractaddress, content, isOpen, onClose, owner, useraddress }: MenuInfo) => {
  const { writeAsync: plantSeed } = useContractWrite({
    address: contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "plantSeed",
    args: [BigInt(id)],
  });

  const { writeAsync: waterSeed } = useContractWrite({
    address: contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "waterSeed",
    args: [BigInt(id)],
  });

  const { writeAsync: collectPoints } = useContractWrite({
    address: contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "collectPoints",
    args: [BigInt(id)],
  });

  const { writeAsync: stealPlant } = useContractWrite({
    address: contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "stealPlant",
    args: [BigInt(id)],
  });

  const { writeAsync: removeDisappear } = useContractWrite({
    address: contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "removeDisappear",
    args: [BigInt(id)],
  });

  const { writeAsync: levelUpPlant } = useContractWrite({
    address: contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "levelUpPlant",
    args: [BigInt(id)],
  });

  const plant = async () => {
    await plantSeed();
    notification.success("Seed is planted");
  };

  const water = async () => {
    await waterSeed();
    notification.success("Water the plant");
  };

  const collect = async () => {
    try {
      await collectPoints();
      notification.success("Points collected");
    } catch (error) {
      const message = getParsedError(error);
      notification.error(message);
    }
  };

  const steal = async () => {
    try {
      await stealPlant();
      notification.success("Plant is taken");
    } catch (error) {
      const message = getParsedError(error);
      notification.error(message);
    }
  };

  const upgrade = async () => {
    try {
      await levelUpPlant();
      notification.success("Plant is level up");
    } catch (error) {
      const message = getParsedError(error);
      notification.error(message);
    }
  };

  const clear = async () => {
    try {
      await removeDisappear();
      notification.success("Area is cleared");
    } catch (error) {
      const message = getParsedError(error);
      notification.error(message);
    }
  };

  return (
    <>
      <div className="relative">
        {isOpen && (
          <div className="absolute z-20 -mt-7 ml-6 bg-white rounded shadow-md w-[150px]">
            <ul>
              {content === "-" && (
                <li className="px-2 cursor-pointer hover:bg-gray-100" onClick={() => plant()}>
                  <div className="flex items-center">
                    <Image src="/assets/seed.png" alt="Watering Can" width={30} height={30} />
                    <p className="ml-3">Seed</p>
                  </div>
                </li>
              )}
              {(content === "0" || content === "G") && (
                <li className="px-2 cursor-pointer hover:bg-gray-100" onClick={() => water()}>
                  <div className="flex items-center">
                    <Image src="/assets/wateringcan.png" alt="Watering Can" width={30} height={30} />
                    <p className="ml-3">Water</p>
                  </div>
                </li>
              )}
              {content === "G" && owner === useraddress && (
                <li className="px-2 cursor-pointer hover:bg-gray-100" onClick={() => collect()}>
                  <div className="flex items-center">
                    <Image src="/assets/bloompoints.png" alt="Watering Can" width={30} height={30} />
                    <p className="ml-3">Collect</p>
                  </div>
                </li>
              )}
              {content === "G" && owner !== useraddress && (
                <li className="px-2 cursor-pointer hover:bg-gray-100" onClick={() => steal()}>
                  <div className="flex items-center">
                    <ScissorsIcon width={30} height={30} />
                    <p className="ml-3">Steal</p>
                  </div>
                </li>
              )}
              {content === "x" && owner === useraddress && (
                <li className="px-2 cursor-pointer hover:bg-gray-100" onClick={() => clear()}>
                  <div className="flex items-center">
                    <TrashIcon width={30} height={30} />
                    <p className="ml-3">Clear</p>
                  </div>
                </li>
              )}
              {content === "G" && owner === useraddress && (
                <li className="px-2 cursor-pointer hover:bg-gray-100" onClick={() => upgrade()}>
                  <div className="flex items-center">
                    <ChevronDoubleUpIcon width={30} height={30} />
                    <p className="ml-3">Upgrade</p>
                  </div>
                </li>
              )}
              <li className="px-2 cursor-pointer hover:bg-gray-100" onClick={() => onClose()}>
                <div className="flex items-center">
                  <XMarkIcon width={30} height={30} />
                  <p className="ml-3">Cancel</p>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
