"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import useUserStore from "@/store/useStore";
import useInfoStore from "@/store/useInfo";

interface T_DailyCheckCard {
  setDailyTask: React.Dispatch<React.SetStateAction<number>>;
}
const DailyCheckCard: React.FC<T_DailyCheckCard> = ({ setDailyTask }) => {

  const { userId } = useUserStore((state: any) => ({
    userId: state.userId,
  }));

  const setInfoData = useInfoStore((state: any) => state.setInfoData);

  const [followed, setFollowed] = useState(false);
  const [dailyPoint, setDailyPoint] = useState(50);

  const fetchDailyCheckIn = async (id: number) => {
    await axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + `checkin/status/${id}`)
      .then((res) => {
        const response = res.data;
        if (res.data.available) {
          setDailyTask(0);
        } else {
          setDailyTask(1);
        }
        setFollowed(response.available);
        setDailyPoint(response.points);
      });
  };

  const handleDailyCheckIn = async () => {
    await axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "checkin", {
        user_id: userId,
      })
      .then((res) => {
        const response = res.data.user;

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
        fetchDailyCheckIn(userId);
      });
  };

  useEffect(() => {
    fetchDailyCheckIn(userId);
  }, []);

  return (
    <div
      className={`flex items-center px-3 py-2 rounded-[10px] border-solid border-2 border-[#b7e6d4] ${followed ? "bg-white" : "bg-[#b7e6d4]"
        }`}
    >
      <img src="/images/daily-check.png" alt="Daily Check" className="w-9" />
      <div className="ml-3 w-full font-semibold flex-1 text-sm leading-tight  text-white ">
        <p className="text-black text-lg font-mitr">Daily Check In</p>
        <p className="text-[#858494] text-sm font-Rubik">+{dailyPoint} POINTS</p>
      </div>
      {!followed ? (
        <button
          className="relative block whitespace-nowrap font-blod select-none active:scale-95 bg-[#999999] text-black pointer-events-none rounded-lg w-7 pb-1 h-7"
          disabled
          type="button"
        >
          <span className="pointer-events-none relative z-10">
            <div className="w-8 h-8 cursor-pointer bg-black rounded-lg text-sm font-bold flex items-center justify-center">
              ✔
            </div>
          </span>
        </button>
      ) : (
        <button
          onClick={handleDailyCheckIn}
          className="relative block whitespace-nowrap font-blod text-white select-none active:scale-95 bg-white rounded-lg w-7 pb-1 h-7"
        >
          <span className="relative z-10">
            <div className="w-8 h-8 cursor-pointer bg-black rounded-lg text-sm font-bold flex items-center justify-center text-[#FFDA00] font-mitr">
              GO
            </div>
          </span>
        </button>
      )}
    </div>
  );
};

export default DailyCheckCard;
