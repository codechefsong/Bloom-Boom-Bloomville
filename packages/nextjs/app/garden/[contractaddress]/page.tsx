"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const gridData = [
  {
    data: "T",
  },
];

const MatchRoom = ({ params }: { params: { contractaddress: string } }) => {
  const router = useRouter();
  const { address } = useAccount();

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-4 text-3xl">{params.contractaddress}</h2>
      <p>{address}</p>
      <div className="flex flex-wrap" style={{ width: "400px" }}>
        {gridData &&
          gridData.map((item, index) => (
            <div
              key={index}
              className="w-16 h-16 border border-gray-300 flex items-center justify-center font-bold relative bg-white"
            >
              {item.data}
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

export default MatchRoom;
