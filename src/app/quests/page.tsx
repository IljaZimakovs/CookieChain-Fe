"use client";

import useUserStore from "@/store/useStore";
import useInfoStore from "@/store/useInfo";
import { Navbar } from "@/components/Navbar";
import { Progress } from "@/components/ui/progress";
import TaskStatusView from "@/components/TaskStatusView";
import DailyCheckCard from "@/components/DailyCheckCard";
import TwitterFollowCard from "@/components/TwitterFollowCard";
import WalletConnectCard from "@/components/WalletConnectCard";
import TelegramFollowCard from "@/components/TelegramFollowCard";
import ReTweetFollowCard from "@/components/ReTweetFollowCard";
import TwitterPostFollowCard from "@/components/TwitterPostFollowCard";
import { useState } from "react";

export default function Home() {
  const { userId } = useUserStore((state: any) => ({
    userId: state.userId,
  }));

  const {
    user_name,
    point,
    tg_follow,
    rt_follow,
    tpost_follow,
    wallet_address,
    twitter_follow,
  } = useInfoStore((state: any) => ({
    user_name: state.user_name,
    point: state.point,
    tg_follow: state.tg_follow,
    rt_follow: state.rt_follow,
    tpost_follow: state.tpost_follow,
    wallet_address: state.wallet_address,
    twitter_follow: state.twitter_follow,
  }));

  const [dailyTask, setDailyTask] = useState<number>(0);

  const twitterTask = twitter_follow ? 1 : 0;
  const telegramTask = tg_follow ? 1 : 0;
  const rtTask = rt_follow ? 1 : 0;
  const tpostTask = tpost_follow ? 1 : 0;
  const walletTask = wallet_address.length > 0 ? 1 : 0;

  return (
    <>
      <div className="bg-[#1CA774] bg-[url('/images/sky_effect.png')] bg-[length:contain] flex flex-col min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="pt-10 px-5 flex items-center justify-center flex-col w-full text-white">
            <img
              alt=""
              loading="lazy"
              width="1451"
              height="1451"
              decoding="async"
              data-nimg="1"
              className="w-20 h-20 rounded-full"
              src="/images/cookie_quests.png"
              style={{ color: "transparent" }}
            />
            <p className="font-medium mt-4 leading-[0.875rem] font-rubik">
              {user_name}{" "}
            </p>
            <div className="w-full relative mt-8">
              <Progress
                className="relative"
                value={
                  point > 3000 ? (100 / 10000) * point : (100 / 3000) * point
                }
              />
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-lg font-rubik">
                {point} / {point > 3000 ? 10000 : 3000}
              </p>
            </div>
          </div>
          <div className="bg-white p-4 z-20 mt-7 flex-grow pb-40 overflow-hidden rounded-tl-2xl rounded-tr-2xl">
            <div>
              <TaskStatusView
                currentTask={
                  point > 3000
                    ? rtTask + tpostTask + dailyTask
                    : walletTask + twitterTask + telegramTask + dailyTask
                }
                totalTask={point > 3000 ? 3 : 4}
              />
              <div className="relative">
                {point > 3000 ? (
                  <div className="grid gap-6">
                    <DailyCheckCard setDailyTask={setDailyTask} />
                    <ReTweetFollowCard userId={userId} followed={rt_follow} />
                    <TwitterPostFollowCard
                      userId={userId}
                      followed={tpost_follow}
                    />
                  </div>
                ) : (
                  <div className="grid gap-6">
                    <DailyCheckCard setDailyTask={setDailyTask} />
                    <TwitterFollowCard
                      userId={userId}
                      followed={twitter_follow}
                    />
                    <TelegramFollowCard userId={userId} followed={tg_follow} />
                    <WalletConnectCard
                      userId={userId}
                      wallet_address={wallet_address.length > 0 ? true : false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar />;
    </>
  );
}
