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
      className="flex items-center px-3 py-2 rounded-[10px] border-solid border-2 border-[#b7e6d4]"
    >
      <img src="/images/daily-check.png" alt="Daily Check" className="w-9" />
      <div className="ml-3 w-full font-semibold flex-1 text-sm leading-tight  text-white ">
        <p className="text-black text-[16px] font-medium font-rubik">Daily Check In</p>
        <p className="text-[#858494] text-[12px] font-rubik">+{dailyPoint} POINTS</p>
      </div>
      {!followed ? (
        <img className="w-[21px]" src="./images/checked.png" />
      ) : (
        <button
          onClick={handleDailyCheckIn}
          className="relative block whitespace-nowrap bg-[url('/images/history_background.png')] bg-[length:contain] font-blod select-none active:scale-95 text-black pointer-events-none rounded-lg w-8 pb-1 h-8"
        >
          <span>
            GO
          </span>
        </button>
      )}
    </div>
  );
};

export default DailyCheckCard;
