import { Achievement } from "@/utils/achievement";
import Image from "next/image";
import React from "react";

interface PodiumProps {
  achievement: Achievement;
}

export const Podium = ({ achievement }: PodiumProps) => {
  const { title, subtitle, description, performers } = achievement;

  return (
    <div className="flex flex-col items-center p-6 rounded-lg shadow-md w-[420px] min-h-[420px]">
      <h2 className="text-2xl text-center font-bold">{title}</h2>
      <h3 className="text-sm text-center text-gray-500 mb-6">{subtitle}</h3>

      <div className="flex items-end space-x-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-32 bg-gray-300 rounded-t-lg flex items-center justify-center">
            <Image
              src={`/avatars/${performers[1].avatar}`}
              alt=""
              width={48}
              height={48}
              className="rounded-full border-2 border-white"
            />
          </div>
          <p className="mt-2 text-xs font-semibold">{performers[1].name}</p>
          <p className="text-sm text-gray-600">{performers[1].score}</p>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-40 bg-yellow-400 rounded-t-lg flex items-center justify-center">
            <Image
              src={`/avatars/${performers[0].avatar}`}
              width={64}
              height={64}
              alt=""
              className="rounded-full border-2 border-white"
            />
          </div>
          <p className="mt-2 font-semibold">{performers[0].name}</p>
          <p className="text-sm text-gray-600">{performers[0].score}</p>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-28 bg-orange-400 rounded-t-lg flex items-center justify-center">
            <Image
              src={`/avatars/${performers[2].avatar}`}
              alt=""
              width={48}
              height={48}
              className="rounded-full border-2 border-white"
            />
          </div>
          <p className="mt-2 text-xs font-semibold">{performers[2].name}</p>
          <p className="text-sm text-gray-600">{performers[2].score}</p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 text-center text-gray-600">{description}</p>
    </div>
  );
};
