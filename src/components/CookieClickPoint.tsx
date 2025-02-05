"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CookiePointHistory from "./CookiePointHistory";
import axios from "axios";
import useUserStore from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import useInfoStore from "@/store/useInfo";
import 'csshake/dist/csshake-slow.min.css';

interface T_PointData {
  _id: string;
  userId: number;
  text: string;
  point: number;
  __v: number;
}

interface T_CookieClickPoint {
  totalPoint: number;
  setTotalPoint: React.Dispatch<React.SetStateAction<number>>;
  setPockNumber: React.Dispatch<React.SetStateAction<number>>;
}

const CookieClickPoint: React.FC<T_CookieClickPoint> = ({
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
      <div className="flex w-full flex-col px-6 relative">
        <h2 className="text-[24px] text-white py-10 font-rubik font-medium text-center">Home</h2>
        <div className="flex justify-center items-center py-4 bg-[url('/images/charact_background.png')] bg-[length:100%_100%]">
          <img
            onClick={clickPoint}
            src="/images/placeholder.png"
            alt="Main Background"
            className="shake-hard w-[60%] h-auto drop-shadow-xl"
          />
        </div>
        {isLoading && (
          <Image
            src={`/images/card-${randomImage}.png`}
            alt="Card Image"
            width={160}
            height={100}
            className="absolute top-5 right-6 transition-all duration-150"
          />
        )}
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
                className={`font-rubik text-lg ${latestPoint > 0 ? "text-[#313743]" : "text-gray-900"
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
        <div className="w-full flex justify-between gap-1 bg-[url('/images/points_background.png')] bg-[length:100%_100%] rounded-[15] mt-7 px-6 py-3 font-rubik">
          <div className="flex flex-col gap-2">
            <p className="text-[#313743] text-[14px] font-medium leading-[18px] font-rubik">Cookie Points</p>
            <p className="text-[#313743] text-[20px] font-medium leading-[24px] text-center">
              {totalPoint.toLocaleString()}
              <span className="font-light">/3,000</span>
            </p>
          </div>
        </div>
      </div>
      <div className="px-2 w-full py-[50px]">
        <CookiePointHistory pointData={pointData} />
      </div>
    </>
  );
};

export default CookieClickPoint;
