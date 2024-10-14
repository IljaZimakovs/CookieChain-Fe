"use client";

import Image from "next/image";
import React from "react";

interface T_PointData {
  _id: string;
  userId: number;
  text: string;
  point: number;
  __v: number;
}

interface PandaPointHistoryProps {
  pointData: T_PointData[];
}

const PandaPointHistory: React.FC<PandaPointHistoryProps> = ({ pointData }) => {
  return (
    <div className="flex w-full flex-col items-center bg-white relative rounded-t-2xl -top-7 p-4 pb-24 font-mitr">
      <p className="text-black text-[20px] leading-7">Cookie Points</p>
      <div className="grid w-full gap-[14px] mt-3">
        {pointData.length > 0 ? (
          pointData
            .slice(-10)
            .reverse()
            .map((point, index) => (
              <div
                key={index}
                className="flex w-full justify-between items-center rounded-lg bg-[#22CA8C] border-solid border-2 border-[#22CA8C] text-black font-mitr text-base p-[5px] pr-4 gap-[10px]"
              >
                <Image
                  className="rounded-lg"
                  src={
                    point.point > 0
                      ? "/images/smile_cookie.png"
                      : "/images/sad_cookie.png"
                  }
                  alt="Smile Cookie"
                  width={46}
                  height={46}
                />
                <p className="flex-1">{point.text}</p>
                <p className="text-[28px]">
                  {point.point > 0 ? "+" : ""}
                  {point.point}
                </p>
              </div>
            ))
        ) : (
          <p className="text-white text-lg text-center mt-4">No Cookie point</p>
        )}
      </div>
    </div>
  );
};

export default PandaPointHistory;
