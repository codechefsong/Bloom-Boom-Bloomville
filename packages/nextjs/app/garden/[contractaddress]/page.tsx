"use client";

import { useRouter } from "next/navigation";
import Plant from "./_components/Plant";
import { useAccount, useContractRead } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Garden = ({ params }: { params: { contractaddress: string } }) => {
  const router = useRouter();
  const { address } = useAccount();

  const { data: owner } = useContractRead({
    address: params.contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "owner",
    watch: true,
  });

  const { data: gridData } = useContractRead({
    address: params.contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "getGrid",
    watch: true,
  });

  const { data: pointAmount } = useScaffoldContractRead({
    contractName: "BloomPoint",
    functionName: "balanceOf",
    args: [address],
  });

  const getCurrentTime = () => {
    const currentDate = new Date();
    const unixTime = currentDate.getTime() / 1000;
    return unixTime;
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-4 text-xl">Own by {owner}</h2>
      <p className="text-2xl">{pointAmount?.toString()} Bloom Points</p>
      <div className="flex flex-wrap" style={{ width: "400px" }}>
        {gridData &&
          gridData.map((item, index) => (
            <Plant
              key={index}
              id={index}
              contractaddress={params.contractaddress}
              item={item}
              currentTime={getCurrentTime()}
              owner={owner || ""}
              useraddress={address || ""}
            />
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
