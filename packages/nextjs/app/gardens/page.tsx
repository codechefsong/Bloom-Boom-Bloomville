"use client";

import type { NextPage } from "next";

const Gardens: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mt-10 mb-2">Gardens</h2>
      <button className="py-2 px-16 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50">
        Create Garden
      </button>
      <div className="flex justify-center px-4 md:px-0 mt-5">
        <div className="w-20 h-20 border border-gray-30 flex items-center justify-center font-bold mr-2 mb-2 cursor-pointer bg-green-200">
          G
        </div>
      </div>
    </div>
  );
};

export default Gardens;
