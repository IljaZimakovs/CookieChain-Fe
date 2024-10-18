"use client";

import useInfoStore from "@/store/useInfo";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const { user_name, point, sequence_no } = useInfoStore((state: any) => ({
    user_name: state.user_name,
    point: state.point,
    sequence_no: state.sequence_no,
  }));

  return (
    <>
      <div className="min-h-screen w-full bg-[#1CA774] bg-[url('/images/idcard_background.png')] bg-[length:contain] px-2 flex flex-col justify-end pb-[110px]">
        <div className="relative bg-[url('/images/history_background.png')] pt-14 bg-[length:contain] bg-no-repeat">
          <img
            src={"/images/cookie_id_logo.png"}
            alt="Badge level 1"
            className="w-[96px] h-[96px] absolute left-1/2 transform -translate-x-1/2 -translate-y-[100px] z-20"
          />
          <div className="bg-white px-4 font-[EXO] p-6">
            <h2 className="text-[14px] leading-[2rem] text-gray-600 text-center font-rubik font-medium">
              Cookie Planet ID Card
            </h2>
            <p className="font-medium text-[32px] leading-none text-black text-center font-rubik mt-2">
              {sequence_no}
            </p>
            <div className="flex flex-col gap-2 items-center bg-[url('/images/id_background.png')] bg-[length:100%_100%] bg-no-repeat p-4 pb-10 mt-4">
              <div className="w-full flex justify-end pb-2">
                <span className="bg-white py-2 px-3 rounded-full border-[2px] border-[#E6F0D1] text-black font-rubik font-medium text-[12px]">
                  LEVEL {point > 3000 ? 2 : 1}
                </span>
              </div>
              <img src="./images/cookie_card.png" className="w-[128px] " />
              <h2 className="text-[20px] leading-1.75rem] text-center text-black mt-4 mb-1 font-rubik font-medium">
                ({user_name}) OrcCookie
              </h2>
              <p className="text-black leading-[1.375rem] text-center text-[16px] pb-2 font-rubik">
                Leading the horde, breaking
              </p>
              <p className="text-black leading-[1.375rem] text-center text-[16px] pb-2 font-rubik">
                through obstacles in the
              </p>
              <p className="text-[#1EB17B] text-center font-rubik font-semibold text-[16px]">
                TON universe!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
