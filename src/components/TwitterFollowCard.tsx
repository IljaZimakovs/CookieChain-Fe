"use client";

import React, { useState } from "react";
import axios from "axios";
import useInfoStore from "@/store/useInfo";
import { CircleSpinner } from "react-spinners-kit";

interface T_TwitterFollowCard {
  followed: any;
  userId: number;
}

const TwitterFollowCard: React.FC<T_TwitterFollowCard> = ({
  followed,
  userId,
}) => {
  const setInfoData = useInfoStore((state: any) => state.setInfoData);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(30);

  const followTwitter = async () => {
    setIsLoading(true);

    let count = 30; // Initialize the countdown value

    // Create an interval that decreases the countdown value every second
    const intervalId = setInterval(() => {
      setCountDown((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          clearInterval(intervalId); // Clear interval when countdown reaches 0
          return 0;
        }
      });
    }, 1000); // Update every second

    try {
      // Introduce a 30-second delay while the countdown happens
      await new Promise((resolve) => setTimeout(resolve, 30000));

      // Make the API request to follow Twitter
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "follow_twitter",
        {
          user_id: userId,
        }
      );

      const response = res.data;

      // Update your state with the response data
      setInfoData(
        response.userId,
        response.username,
        response.first_name,
        response.wallet_address,
        response.twitter_follow,
        response.tg_follow,
        response.rt_follow,
        response.tpost_follow,
        response.verified,
        response.sequence_no,
        response.score
      );
    } catch (error) {
      console.error("Error following Twitter:", error);
    } finally {
      setIsLoading(false);
      clearInterval(intervalId);
      setCountDown(30);
    }
  };

  return (
    <div
      className="flex items-center px-3 py-2 rounded-[10px] border-solid border-2 border-[#b7e6d4]"
    >
      <img
        src="https://static.duckchain.io/wallet.svg"
        alt=""
        className="w-9"
      />
      <div className="ml-3 w-full font-semibold flex-1 text-sm leading-tight  text-white ">
        <p className="text-black text-[16px] font-medium font-rubik">Join CookieChain Twitter</p>
        <p className="text-[#858494] text-[12px] font-rubik">+300 POINTS</p>
      </div>
      {followed ? (
        <img className="w-[21px]" src="./images/checked.png" />
      ) : (
        <a
          className={`relative block whitespace-nowrap font-bold  text-white select-none active:scale-95 bg-white rounded-lg w-8 pb-1 h-8 ${isLoading ? "pointer-events-none opacity-50" : ""
            }`}
          href="https://x.com/CookieChain_io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="relative z-10">
            <div
              onClick={followTwitter}
              className={`w-8 h-8 cursor-pointer rounded-lg text-sm font-bold flex items-center justify-center text-[#FFDA00] font-rubik`}
            >
              {isLoading ? (
                <p className="text-white">{countDown}</p>
              ) : (
                <div className="flex items-center">
                  <p className="text-[20px] text-[#1EB17B] font-rubik font-medium">GO</p>
                  <img src="./images/arrow.png" className="w-[24px] h-[24px]" />
                </div>
              )}
            </div>
          </span>
        </a>
      )}
    </div>
  );
};

export default TwitterFollowCard;
