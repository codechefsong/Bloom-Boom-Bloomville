"use client";

import { useRouter } from "next/navigation";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";

const Garden = ({ params }: { params: { contractaddress: string } }) => {
  const router = useRouter();
  const { address } = useAccount();

  const { data: owner } = useContractRead({
    address: params.contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "owner",
  });

  const { data: gridData } = useContractRead({
    address: params.contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "getGrid",
  });

  const { writeAsync: plantSeed } = useContractWrite({
    address: params.contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "plantSeed",
    args: [BigInt(0)],
  });

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-4 text-xl">Own by {owner}</h2>
      <p>{address}</p>
      <div className="flex flex-wrap" style={{ width: "400px" }}>
        {gridData &&
          gridData.map((item, index) => (
            <div
              key={index}
              className="w-20 h-20 border border-gray-300 flex items-center justify-center font-bold relative bg-white"
              onClick={() => plantSeed()}
            >
              {item.content}
            </div>
          ))}
      </div>
      <button
        className="py-2 px-16 mb-1 mt-3 bg-gray-300 rounded baseline hover:bg-gray-200 disabled:opacity-50"
        onClick={() => router.push("/gardens")}
      >
        Back
      </button>
    </div>
  );
};

export default Garden;
