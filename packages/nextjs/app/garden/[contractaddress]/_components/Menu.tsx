"use client";

import { useContractWrite } from "wagmi";
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
          <div className="absolute z-10 -mt-7 ml-6 bg-white rounded shadow-md">
            <ul>
              {content === "-" && (
                <li className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => plant()}>
                  Plant
                </li>
              )}
              {(content === "0" || content === "G") && (
                <li className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => water()}>
                  Water
                </li>
              )}
              {content === "G" && owner === useraddress && (
                <li className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => collect()}>
                  Collect
                </li>
              )}
              {content === "G" && owner !== useraddress && (
                <li className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => steal()}>
                  Steal
                </li>
              )}
              {content === "x" && owner === useraddress && (
                <li className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => clear()}>
                  Clear
                </li>
              )}
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
