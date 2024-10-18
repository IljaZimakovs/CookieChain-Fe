"use client";

import React, { useEffect } from "react";
import { useUtils } from "@telegram-apps/sdk-react";
import {
  useTonAddress,
  useTonConnectModal,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";

interface T_WalletConnectCard {
  userId: number;
  wallet_address: boolean;
}

const WalletConnectCard: React.FC<T_WalletConnectCard> = ({
  userId,
  wallet_address,
}) => {
  const wallet = useTonWallet();

  const { open } = useTonConnectModal();

  const openWallet = () => {
    wallet ? "" : open();
  };

  return (
    <div
      className="flex items-center px-3 py-2 rounded-[10px] border-solid border-2 border-[#b7e6d4]"
    >
      <img src="https://static.duckchain.io/x.svg" alt="" className="w-9" />
      <div className="ml-3 w-full flex-1 font-semibold text-sm leading-tight  text-white ">
        <p className="text-black text-[16px] font-medium font-rubik">Connect Ton Wallet</p>
        <p className="text-[#858494] text-[12px] font-rubik">+500 POINTS</p>
      </div>
      {wallet_address ? (
        <img className="w-[21px]" src="./images/checked.png" />
      ) : (
        <div className="flex items-center whitespace-nowrap font-blod text-white select-none active:scale-95 bg-white rounded-lg w-8 h-8">
          <span className="relative z-10">
            <div className="flex items-center">
              <button
                onClick={openWallet}
                className="text-[20px] text-[#1EB17B] font-rubik font-medium"
              >
                GO
              </button>
              <img src="./images/arrow.png" className="w-[24px] h-[24px]" />
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default WalletConnectCard;
