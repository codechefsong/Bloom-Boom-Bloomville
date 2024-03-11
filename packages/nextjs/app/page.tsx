"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Bloom Boom Bloomville</span>
          </h1>
          <Image className="ml-8" alt="Game" width={400} height={350} src="/assets/game.png" />
          <p className="text-center text-lg mb-0">Build gardens, plant and grow flowers, and earn bloom points</p>
          <div className="flex justify-center mb-2">
            <Link
              href="/gardens"
              passHref
              className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-400 disabled:opacity-50"
            >
              See Garden
            </Link>
          </div>
        </div>

        <div className="flex-grow bg-green-200 w-full mt-16 px-8 py-12">
          <div className="text-center">
            <h2 className="mt-3 text-4xl mb-5">Gameplay</h2>
          </div>
          <div className="flex justify-center">
            <div className="w-[700px]">
              <ul className="list-disc text-xl" style={{ width: "600px" }}>
                <li>Buy and mint a garden as an NFT</li>
                <li>Plant a seed in your garden.</li>
                <li>Water your seed to grow into a flower</li>
                <li>Level up your plant by using bloom points. By doing so, you&apos;ll earn more points</li>
                <li>
                  The plant needs to be watered each day, or someone can steal your plant and collect its bloom points
                </li>
                <li>Buy and customize your garden with bloom points to purchase garden floor tiles</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
