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
        <div className="min-h-screen bg-[#F4F7E0]">
          <div className="flex w-full flex-col px-4 font-[EXO] py-8 items-center">
            <div className="flex w-full justify-between items-center gap-3">
              <div className="flex-1 h-1 rounded-full bg-black"></div>
              <div className="flex-1 h-1 rounded-full bg-black"></div>
              <div className="flex-1 h-1 rounded-full bg-second_yellow"></div>
            </div>

            <h2 className="text-3xl leading-[2rem] text-black text-center font-mitr mt-6">
              Panda Planet ID Card
            </h2>
            <p className="font-semibold text-[1.85rem] leading-none text-black text-center font-mitr mt-2">
              No. {sequenceNumber}
            </p>
            <div className="bg-[#3F3F3F] p-2 mt-10 rounded-3xl text-white">
              <div className="w-full relative">
                <div className="w-full h-full rounded-lg">
                  <img
                    src={"/images/panda-card.png"}
                    alt="Panda Card"
                    className="w-full h-full"
                  />
                </div>
                <img
                  src={"/images/badge-1.png"}
                  alt="Badge level 1"
                  className="w-16 h-16 absolute -top-[30px] -right-4 z-20"
                />
                <span className="absolute bg-[#6BB2E9] -top-[34px] right-9 z-10 py-1 px-4 rounded-full border-[2px] border-black text-white font-mitr text-sm">
                  LEVEL 1
                </span>
              </div>
              <h2 className="text-xl leading-[1.75rem] text-center mt-4 mb-1 font-mitr text-second_yellow">
                {IdName}
              </h2>
              <p className="leading-[1.375rem] text-center pb-4 px-8 font-mitr font-medium">
                A unique twist in the TON universe, you&lsquo;re no ordinary
                Cookie!
              </p>
            </div>

            <button
              onClick={handleVerify}
              className="flex w-64 h-10 justify-center items-center text-white font-mitr bg-black rounded-full text-base mt-6 transition-all duration-100"
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
      ) : (
        <div className="flex w-full flex-col gap-1 justify-center items-center min-h-screen p-5 bg-[#F4F7E0] font-mitr">
          <p className="text-black text-4xl leading-8 text-start font-semibold">
            An invitation from PandaChain
          </p>
          <p className="w-full text-start text-[#6BB2E9] text-2xl">
            PLEASE CHECK
          </p>
          <div className="flex w-full gap-4 justify-between items-start mt-5">
            <div className="flex w-full flex-col items-start">
              <div className="flex justify-normal gap-3">
                <span className="flex bg-[#6BB2E9] py-0.5 px-4 rounded-full text-white text-[23px] font-[500]">
                  From
                </span>
                <Image
                  className="relative -top-3"
                  src={"/images/check.png"}
                  alt="Check"
                  width={28}
                  height={24}
                />
              </div>
              <span className="flex bg-[#6BB2E9] py-0.5 px-4 rounded-full text-white text-[23px] font-[500] -mt-1">
                PandaChain
              </span>
            </div>
            <Image
              className="flex-1 -mt-2"
              src={"/images/you-have-one.png"}
              alt="You have one"
              width={113}
              height={113}
            />
          </div>
          <Image
            className="mt-5"
            src={"/images/bg.png"}
            alt="Background"
            width={335}
            height={360}
          />
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
