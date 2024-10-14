"use client";

import useInfoStore from "@/store/useInfo";
import axios from "axios";
import React, { useState } from "react";
import { CircleSpinner } from "react-spinners-kit";

interface T_TwitterPostFollowCard {
  followed: any;
  userId: number;
}

const TwitterPostFollowCard: React.FC<T_TwitterPostFollowCard> = ({
  followed,
  userId,
}) => {
  const setInfoData = useInfoStore((state: any) => state.setInfoData);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const followTwitterPost = async () => {
    setIsLoading(true);
    await axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "follow-tpost", {
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
    <div
      className={`flex items-center px-3 py-2 rounded-[10px] border-solid border-2 border-[#b7e6d4] ${
        followed ? "bg-white" : "bg-[#b7e6d4]"
      }`}
    >
      <img
        src="https://static.duckchain.io/wallet.svg"
        alt=""
        className="w-9"
      />
      <div className="ml-3 w-full font-semibold flex-1 text-sm leading-tight  text-white ">
        <p className="text-black text-lg font-mitr">Retweet and Like</p>
        <p className="text-[#222222] text-sm font-mitr">+20 POINTS</p>
      </div>
      {followed ? (
        <button
          className="relative block whitespace-nowrap font-blod select-none active:scale-95 bg-[#999999] text-black pointer-events-none rounded-lg w-7 pb-1 h-7"
          disabled
          type="button"
        >
          <span className="pointer-events-none relative z-10">
            <div className="w-8 h-8 cursor-pointer bg-black rounded-lg text-sm font-bold flex items-center justify-center">
              <img
                alt=""
                loading="lazy"
                width="16"
                height="17"
                decoding="async"
                data-nimg="1"
                className="w-5 select-none"
                src="https://tgdapp.duckchain.io/_next/static/media/success.c375e092.svg"
                style={{ color: "transparent" }}
              />
            </div>
          </span>
        </button>
      ) : (
        <a
          className="relative block whitespace-nowrap font-blod text-white select-none active:scale-95 bg-white rounded-lg w-7 pb-1 h-7"
          href="https://twitter.com/intent/like?tweet_id=1830988249562783782"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span onClick={followTwitterPost} className="relative z-10">
            <div className="w-8 h-8 cursor-pointer bg-black rounded-lg text-sm font-bold flex items-center justify-center text-[#FFDA00] font-mitr">
              {isLoading ? (
                <CircleSpinner
                  size={18}
                  frontColor="#ffffff"
                  backColor="#ffffff"
                  color="#ffffff"
                  loading={isLoading}
                />
              ) : (
                <p>GO</p>
              )}
            </div>
          </span>
        </a>
      )}
    </div>
  );
};

export default TwitterPostFollowCard;
