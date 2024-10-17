"use client";

import Image from "next/image";
import React, { useState } from "react";
import VerifyModal from "./VerifyModal";
import { ClapSpinner } from "react-spinners-kit";
import useUserStore from "@/store/useStore";
import useInfoStore from "@/store/useInfo";
import axios from "axios";
import useVerifyStore from "@/store/useVerify";

interface T_VerifyEnterScreen {
  sequenceNumber: number;
}

const VerifyEnterScreen: React.FC<T_VerifyEnterScreen> = ({
  sequenceNumber,
}) => {
  const setVerify = useVerifyStore((state: any) => state.setVerify);
  const { userId } = useUserStore((state: any) => ({
    userId: state.userId,
  }));
  const setInfoData = useInfoStore((state: any) => state.setInfoData);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [miniVerified, setMiniVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [IdName, setIdName] = useState<string>("");

  const handleOpenChange = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleVerify = () => {
    setIsLoading(true);

    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "verify-account", {
        user_id: userId,
      })
      .then((res) => {
        const response = res.data;
        setIsLoading(false);

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

        setTimeout(() => {
          setVerify(true);
        }, 500);
      });
  };

  return (
    <>
      {miniVerified ? (
        <div className="min-h-screen w-full bg-[#1CA774] px-2 flex flex-col justify-end">
          <div className="relative pt-14 ">
            <div className="bg-white rounded-t-[30px] px-4 font-[EXO] p-6 py-14">
              <h2 className="text-[14px] leading-[2rem] text-gray-600 text-center font-rubik font-medium">
                Cookie Planet ID Card
              </h2>
              <p className="font-medium text-[32px] leading-none text-black text-center font-rubik mt-2">
                {sequenceNumber}
              </p>
              <div className="flex flex-col gap-2 items-center bg-[url('/images/id_background.png')] bg-[length:100%_100%] bg-no-repeat p-4 pb-10 mt-4">
                <div className="w-full flex justify-end pb-2">
                  <span className="bg-white py-2 px-3 rounded-full border-[2px] border-[#E6F0D1] text-black font-rubik font-medium text-[12px]">
                    LEVEL 1
                  </span>
                </div>
                <img src="./images/cookie_card.png" className="w-[128px] " />
                <h2 className="text-[20px] leading-1.75rem] text-center text-black mt-4 mb-1 font-rubik font-medium">
                  ({IdName}) OrcCookie
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
              <button
                onClick={handleVerify}
                className="flex w-full h-10 justify-center items-center text-white font-rubik bg-[#189869] rounded-full text-base mt-6 transition-all duration-100"
              >
                {isLoading ? (
                  <ClapSpinner
                    size={20}
                    frontColor="#ffffff"
                    backColor="#ffffff"
                    color="#ffffff"
                    loading={isLoading}
                  />
                ) : (
                  <p className="transition-all duration-100">Enter</p>
                )}
              </button>
            </div>
          </div>
        </div>
        // <div className="w-full flex flex-col items-center min-h-screen py-14 px-8 bg-[#1EB17B] font-rubik">
        //   <div className="flex w-full justify-center items-center gap-3 pb-8">
        //     <div className="w-[15px] h-[15px] rounded-full bg-[#CCE663]"></div>
        //     <div className="w-[15px] h-[15px] rounded-full bg-[#CCE663]"></div>
        //     <div className="w-[100px] h-[15px] rounded-full bg-[#189869]"></div>
        //   </div>
        //   <div className="w-full flex bg-white p-4 rounded-2xl flex-col items-center">
        //     <h2 className="text-2xl leading-[2rem] text-black text-center font-rubik mt-6">
        //       Cookie Planet ID Card
        //     </h2>
        //     <p className="font-semibold text-xl leading-none text-black text-center font-rubik mt-2">
        //       No. {sequenceNumber}
        //     </p>
        //     <div className="bg-[#3F3F3F] p-2 mt-10 rounded-3xl text-white">
        //       <div className="w-full relative">
        //         <div className="w-full h-full rounded-lg">
        //           <img
        //             src={"/images/cookie_card.jpeg"}
        //             alt="Cookie Card"
        //             className="w-full h-full"
        //           />
        //         </div>
        //         <img
        //           src={"/images/badge-1.png"}
        //           alt="Badge level 1"
        //           className="w-16 h-16 absolute -top-[30px] -right-4 z-20"
        //         />
        //         <span className="absolute bg-[#6BB2E9] -top-[34px] right-9 z-10 py-1 px-4 rounded-full border-[2px] border-black text-white font-rubik text-sm">
        //           LEVEL 1
        //         </span>
        //       </div>
        //       <h2 className="text-xl leading-[1.75rem] text-center mt-4 mb-1 font-rubik text-second_yellow">
        //         {IdName}
        //       </h2>
        //       <p className="leading-[1.375rem] text-center pb-4 px-8 font-rubik font-medium">
        //         A unique twist in the TON universe, you&lsquo;re no ordinary
        //         Cookie!
        //       </p>
        //     </div>

        //   </div>
        //     <button
        //       onClick={handleVerify}
        //       className="flex w-64 h-10 justify-center items-center text-black font-rubik bg-white rounded-full text-base mt-6 transition-all duration-100"
        //     >
        //       {isLoading ? (
        //         <ClapSpinner
        //           size={20}
        //           frontColor="#ffffff"
        //           backColor="#ffffff"
        //           color="#ffffff"
        //           loading={isLoading}
        //         />
        //       ) : (
        //         <p className="transition-all duration-100">Enter</p>
        //       )}
        //     </button>
        // </div>
      ) : (
        <div className="w-full min-h-screen py-14 px-8 bg-[#1EB17B] font-rubik">
          <div className="w-full py-10 flex bg-white p-4 rounded-2xl flex-col items-center">
            <p className="w-full py-4 text-center text-black text-[28px] font-medium leading-8 font-rubik">
              An invitation from CookieChain
            </p>
            <div className="flex p-2 items-center">
              <p className="w-full text-center text-black text-[20px] font-rubik pr-1">
                PLEASE CHECK
              </p>
              <Image
                src={"/images/check.png"}
                alt="Check"
                width={22}
                height={22}
              />
            </div>
            <p className="w-full text-center text-black text-[14px] font-rubik font-medium pr-1">
              From CookieChain
            </p>
            <div className="flex w-full py-4 gap-4 justify-center items-start mt-5">
              <span className="flex bg-[#CCE663] py-1 px-4 rounded-full text-black text-[14px] font-medium">
                You have one
              </span>
            </div>
            <Image
              className="mt-5"
              src={"/images/post_box.png"}
              alt="Background"
              width={224}
              height={360}
            />
          </div>
          <VerifyModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            verified={miniVerified}
            setVerified={setMiniVerified}
            setIdName={setIdName}
            handleOpenChange={handleOpenChange}
          />
        </div>
      )}
    </>
  );
};

export default VerifyEnterScreen;
