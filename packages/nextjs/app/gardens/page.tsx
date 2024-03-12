"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Gardens: NextPage = () => {
  const router = useRouter();

  const { data: gardens } = useScaffoldContractRead({
    contractName: "Bloomville",
    functionName: "getGardens",
  });

  const { writeAsync: buyGarden } = useScaffoldContractWrite({
    contractName: "Bloomville",
    functionName: "buyGarden",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  return (
    <div
      className="flex flex-col items-center bg-cyan-200"
      style={{
        backgroundImage: "url('/assets/background2.jpg')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        height: "94vh",
      }}
    >
      <div className="mt-10 mb-2"></div>
      <Image className="ml-8" alt="Game" width={250} height={250} src="/assets/logosign.png" />
      <button
        className="mt-5 ml-5 py-2 px-16 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
        onClick={() => buyGarden()}
      >
        Buy Garden
      </button>
      <div className="flex justify-center px-4 md:px-0 mt-5">
        {gardens?.map(g => (
          <div
            key={g.id.toString()}
            className="w-20 h-20 border border-gray-30 flex items-center justify-center font-bold mr-2 mb-2 cursor-pointer bg-green-200"
            onClick={() => router.push("/garden/" + g.contractAdress)}
          >
            {g.url ? <Image src={g.url} alt="Garden" width={50} height={50} /> : <p>{g.id.toString()}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gardens;
