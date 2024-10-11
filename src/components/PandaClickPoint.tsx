"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PandaPointHistory from "./PandaPointHistory";
import axios from "axios";
import useUserStore from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import useInfoStore from "@/store/useInfo";

interface T_PointData {
  _id: string;
  userId: number;
  text: string;
  point: number;
  __v: number;
}

interface T_PandaClickPoint {
  totalPoint: number;
  setTotalPoint: React.Dispatch<React.SetStateAction<number>>;
  setPockNumber: React.Dispatch<React.SetStateAction<number>>;
}

const PandaClickPoint: React.FC<T_PandaClickPoint> = ({
  totalPoint,
  setTotalPoint,
  setPockNumber,
}) => {
  const { userId } = useUserStore((state: any) => ({
    userId: state.userId,
  }));
  const { point } = useInfoStore((state: any) => ({
    point: state.point,
  }));

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pointData, setPointData] = useState<T_PointData[]>([]);
  const [latestPoint, setLatestPoint] = useState<number>(0);
  // const [totalPoint, setTotalPoint] = useState<number>(0);
  const [randomImage, setRandomImage] = useState<number>(-1);

  const clickPoint = () => {
    if (isLoading) return;
    setRandomImage(Math.floor(Math.random() * 3));
    setIsLoading(true);
    const audio = new Audio("/reward.mp3");
    audio.play();

    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "click-point", {
        user_id: userId,
      })
      .then((res) => {
        fetchClickPoints();
        setTotalPoint(res.data.score);
        setLatestPoint(res.data.newPoint.point);

        setTimeout(() => {
          setIsLoading(false);
          setLatestPoint(0);
          setRandomImage(-1);
        }, 2000);
      });
  };

  const fetchClickPoints = async () => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + `get-point/${userId}`)
      .then((res) => {
        setPockNumber(res.data.length);
        setPointData(res.data);
      });
  };

  useEffect(() => {
    fetchClickPoints();
  }, []);

  return (
    <>
      <div className="flex w-full flex-col px-6 h-[500px] relative">
        <div className="flex justify-center items-center py-4 bg-[url('/images/charact_background.png')] bg-[length:100%_100%]">
          <img
            onClick={clickPoint}
            src="/images/cookie_character.png"
            alt="Main Background"
            className="w-[60%] h-auto drop-shadow-xl"
          />
        </div>
        {/* {isLoading && (
          // <Image
          //   src={`/images/card-${randomImage}.png`}
          //   alt="Card Image"
          //   width={160}
          //   height={100}
          //   className="absolute top-5 right-6 transition-all duration-150"
          // />
        )} */}
        {latestPoint !== 0 && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 1, y: 0, x: latestPoint > 0 ? 0 : -30 }}
              animate={{ opacity: 0, y: -40, x: latestPoint > 0 ? 100 : -130 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className={`flex justify-center items-center absolute pointer-events-none top-72 left-1/2 transform -translate-x-1/2 w-14 h-10 rounded-full  ${latestPoint > 0 ? "bg-black" : "bg-[#f0efef]"
                }`}
            >
              <p
                className={`font-mitr text-lg ${latestPoint > 0 ? "text-[#313743]" : "text-gray-900"
                  }`}
              >
                {latestPoint > 0 ? "+" : ""}
                {latestPoint}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
        {/* <Image
            className="flex justify-center"
            src={"/images/grass.png"}
            alt="Grass"
            width={333}
            height={71}
          /> */}
        <div className="w-full flex justify-between gap-1 bg-[url('/images/points_background.png')] bg-[length:100%_100%] rounded-[15] mt-14 px-6 py-4 font-mitr">
          <div className="flex flex-col gap-4">
            <p className="text-[#313743] text-lg leading-[22px]">Cookie Points</p>
            <p className="text-[#313743] text-4xl leading-[28px] text-center">
              {totalPoint.toLocaleString()}
              {/* {totalPoint} */}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#313743] text-lg leading-[22px]">Cookie Lives</p>
            <p className="text-[#313743] text-4xl leading-[28px] text-center">
              5
              {/* {totalPoint.toLocaleString()} */}
              {/* {totalPoint} */}
            </p>
          </div>
        </div>
      </div>
      <PandaPointHistory pointData={pointData} />
    </>
  );
};

export default PandaClickPoint;
