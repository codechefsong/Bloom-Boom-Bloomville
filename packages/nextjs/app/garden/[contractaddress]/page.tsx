"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Plant from "./_components/Plant";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getParsedError, notification } from "~~/utils/scaffold-eth";

const gridMargin = ["0", "6px", "3.7px", "1.8px", "-0.5px", "-2.5px"];

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

  const { writeAsync: expandGrid } = useContractWrite({
    address: params.contractaddress,
    abi: DeployedContracts[31337].Garden.abi,
    functionName: "expandGrid",
  });

  const getCurrentTime = () => {
    const currentDate = new Date();
    const unixTime = currentDate.getTime() / 1000;
    return unixTime;
  };

  const gridRows = Array.from({ length: (gridData?.length || 0) / 5 });

  const expand = async () => {
    try {
      await expandGrid();
      notification.success("Garden expanded");
    } catch (error) {
      const message = getParsedError(error);
      notification.error(message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-4 text-xl">Own by {owner}</h2>
      <div className="flex items-center">
        <p className="text-2xl mr-3">{pointAmount?.toString()}</p>
        <Image src="/assets/bloompoints.png" width={30} height={25} alt="Bloom Points" />
      </div>
      <Image src="/assets/gridtop.png" alt="Garden Top" width={460} height={50} />
      <div className="relative w-[460px]">
        <div className="absolute">
          {gridRows.map((item, index) => (
            <Image key={index} src="/assets/gridmiddle.png" alt="Garden Middle" width={460} height={50} />
          ))}
        </div>
        <div className="flex flex-wrap mt-[-8px] ml-[30px]">
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
      </div>
      <Image
        style={{ marginTop: `${gridMargin[(gridData?.length || 0) / 5]}` }}
        src="/assets/gridbottom.png"
        alt="Garden Bottom"
        width={460}
        height={50}
      />
      <button
        className="py-2 px-16 mb-1 mt-3 bg-green-400 rounded baseline hover:bg-green-300 disabled:opacity-50"
        onClick={() => expand()}
      >
        Expand
      </button>
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
