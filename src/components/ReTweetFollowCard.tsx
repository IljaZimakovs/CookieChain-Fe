"use client";

import useInfoStore from "@/store/useInfo";
import axios from "axios";
import React, { useState } from "react";
import { CircleSpinner } from "react-spinners-kit";

interface T_ReTweetFollowCard {
  followed: any;
  userId: number;
}

const ReTweetFollowCard: React.FC<T_ReTweetFollowCard> = ({
  followed,
  userId,
}) => {
  const setInfoData = useInfoStore((state: any) => state.setInfoData);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const followReTweet = async () => {
    await axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "follow-retweet", {
        user_id: userId,
      })
      .then((res) => {
        const response = res.data;

        setTimeout(() => {
          setIsLoading(true);

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
        }, 2000);
      });
  };

  return (
    <div className="flex items-center px-3 py-2 rounded-[10px] bg-second_yellow">
      <img
        src="https://static.duckchain.io/wallet.svg"
        alt=""
        className="w-9"
      />
      <div className="ml-3 w-full font-semibold flex-1 text-sm leading-tight  text-white ">
        <p className="text-black text-[16px] font-medium font-rubik">Retweet and Like</p>
        <p className="text-[#858494] text-[12px] font-rubik">+20 POINTS</p>
      </div>
      {followed ? (
        <img className="w-[21px]" src="./images/checked.png" />
      ) : (
        <a
          className="relative block whitespace-nowrap font-blod text-white select-none active:scale-95 bg-white rounded-lg w-8 pb-1 h-8"
          href="https://twitter.com/intent/retweet?tweet_id=1830988249562783782"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="relative z-10">
            <div
              onClick={followReTweet}
              className="w-8 h-8 cursor-pointer bg-black rounded-lg text-sm font-bold flex items-center justify-center text-[#FFDA00] font-rubik"
            >
              {isLoading ? (
                <CircleSpinner
                  size={18}
                  frontColor="#ffffff"
                  backColor="#ffffff"
                  color="#ffffff"
                  loading={isLoading}
                />
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

export default ReTweetFollowCard;
