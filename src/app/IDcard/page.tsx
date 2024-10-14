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
      <div className="min-h-screen bg-[#1CA774]">
        <div className="pb-28">
          <div className="px-4 font-[EXO] py-10">
            <h2 className="text-3xl leading-[2rem] text-white text-center font-Rubik">
              Cookie Planet ID Card
            </h2>
            <p className="font-semibold text-[1.85rem] leading-none text-white text-center font-Rubik mt-2">
              No. {sequence_no}
            </p>
            <div className="bg-[#3F3F3F] p-2 mt-7 rounded-3xl text-white">
              <div className="w-full relative">
                <div className="w-full h-full rounded-lg">
                  <img
                    src={"/images/cookie_idcard.jpeg"}
                    alt="Cookie Card"
                    className="w-full h-full"
                  />
                </div>
                <img
                  src={"/images/cookie.png"}
                  alt="Badge level 1"
                  className="w-16 h-16 absolute -top-[30px] -right-4 z-20"
                />
                <span className="absolute bg-[#6BB2E9] -top-[34px] right-9 z-10 py-1 px-4 rounded-full border-[2px] border-black text-white font-Rubik text-sm">
                  LEVEL {point > 3000 ? 2 : 1}
                </span>
              </div>
              <h2 className="text-xl leading-1.75rem] text-center mt-4 mb-1 font-Rubik">
                ({user_name}) OrcCookie
              </h2>
              <p className="font-extralight  leading-[1.375rem] text-center pb-4 font-Rubik">
                Leading the horde, breaking through obstacles in the TON
                universe!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
