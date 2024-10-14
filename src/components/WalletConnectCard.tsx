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
      className={`flex items-center px-3 py-2 rounded-[10px] border-solid border-2 border-[#b7e6d4] ${wallet_address ? "bg-white" : "bg-[#b7e6d4]"
        }`}
    >
      <img src="https://static.duckchain.io/x.svg" alt="" className="w-9" />
      <div className="ml-3 w-full flex-1 font-semibold text-sm leading-tight  text-white ">
        <p className="text-black text-lg font-mitr">Connect Ton Wallet</p>
        <p className="text-[#222222] text-sm font-mitr">+500 POINTS</p>
      </div>
      {wallet_address ? (
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
        <div className="relative block whitespace-nowrap font-blod text-white select-none active:scale-95 bg-white rounded-lg w-7 pb-1 h-7">
          <span className="relative z-10">
            <button
              onClick={openWallet}
              className="w-8 h-8 cursor-pointer bg-black rounded-lg text-sm font-bold flex items-center justify-center text-[#FFDA00] font-mitr"
            >
              GO
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default WalletConnectCard;
