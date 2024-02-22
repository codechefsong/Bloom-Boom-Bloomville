"use client";

import type { NextPage } from "next";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Gardens: NextPage = () => {
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
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mt-10 mb-2">Gardens</h2>
      <button
        className="py-2 px-16 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
        onClick={() => buyGarden()}
      >
        Buy Garden
      </button>
      <div className="flex justify-center px-4 md:px-0 mt-5">
        {gardens?.map(g => (
          <div
            key={g.id.toString()}
            className="w-20 h-20 border border-gray-30 flex items-center justify-center font-bold mr-2 mb-2 cursor-pointer bg-green-200"
          >
            {g.id.toString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gardens;
