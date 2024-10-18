"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import useInfoStore from "@/store/useInfo";
import { CircleSpinner } from "react-spinners-kit";

interface T_TelegramFollowCard {
  followed: any;
  userId: number;
}

console.log(process.env.NEXT_PUBLIC_TELEGRAM_BOT_API_KEY)

const TelegramFollowCard: React.FC<T_TelegramFollowCard> = ({
  followed,
  userId,
}) => {
  const setInfoData = useInfoStore((state: any) => state.setInfoData);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const fetchTelegramStatus = async () => {
    await axios
      .post(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_API_KEY}/getChatMember`,
        { chat_id: "@CookieChainAnn", user_id: userId }
      )
      .then((res) => {
        setSubscribed(res.data.ok);
      });
  };

  const followTelegram = async () => {
    setIsLoading(true);

    try {
      // Introduce a 30-second delay if needed
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Make the API request to follow Twitter
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "follow-telegram",
        {
          user_id: userId,
        }
      );

      const response = res.data;

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
    }
  };

  useEffect(() => {
    fetchTelegramStatus();
  }, []);

  useEffect(() => {
    if (subscribed && !followed) {
      followTelegram();
    }
  }, [subscribed]);

  return (
    <div
      className="flex items-center px-3 py-2 rounded-[10px] border-solid border-2 border-[#b7e6d4]"
    >
      <img
        src="https://static.duckchain.io/telegram.svg"
        alt=""
        className="w-9"
      />
      <div className="ml-3 w-full font-semibold flex-1 text-sm leading-tight  text-white ">
        <p className="text-black text-[16px] font-medium font-rubik">Join Telegram Channel</p>
        <p className="text-[#858494] text-[12px] font-rubik">+500 POINTS</p>
      </div>
      {followed ? (
        <img className="w-[21px]" src="./images/checked.png" />
      ) : (
        <a
          className="relative block whitespace-nowrap font-blod text-white select-none active:scale-95 bg-white rounded-lg w-8 pb-1 h-8"
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="relative z-10">
            <div className="w-8 h-8 cursor-pointer rounded-lg text-sm font-bold flex items-center justify-center text-[#FFDA00] font-rubik">
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
                  <img src="./images/arrow.png" className="w-[24px] h-[24px]"/>
                </div>
              )}
            </div>
          </span>
        </a>
      )}
    </div>
  );
};

export default TelegramFollowCard;
