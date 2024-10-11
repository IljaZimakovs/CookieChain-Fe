"use client";

import { useInitData } from "@telegram-apps/sdk-react";
import useUserStore from "@/store/useStore";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import useInfoStore from "@/store/useInfo";
import useLoadingStore from "@/store/useloading";
import useVerifyStore from "@/store/useVerify";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import VerifyEnterScreen from "@/components/VerifyEnterScreen";
import PandaClickPoint from "@/components/PandaClickPoint";
import MysteryBoxModal from "@/components/MysteryBoxModal";

const PreLoadingScreen = ({ progress }: { progress: number }) => {
  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-between bg-[#1CA774] pb-14 gap-6">
      <div className="w-full bg-[#1CA774] bg-[url('/images/preloading_background.png')] bg-[length:100%_100%] py-14">
        <div className="w-full flex justify-center py-16 bg-[url('/images/bubbles.png')] bg-[length:cover]">
          <Image
            src={"/images/cookie_jar.png"}
            alt="Panda Logo"
            width={323}
            height={319}
          />
        </div>
      </div>
      <Image src={"/images/preloading_logo.png"} alt="Logo 1" width={212} height={36} />
      <p className="text-[27px] px-5 font-mitr text-center font-[500] text-white">
        CookieChain Pre-Testnet is Now Live!
      </p>

      <div className="flex w-full flex-col gap-2 -mt-7 px-5">
        <p className="text-[16px] leading-7 text-white text-center font-mitr">
          Loading...
        </p>
        <Progress
          className="border border-white h-[14px] rounded-full"
          value={progress}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const initData = useInitData();
  const setUserData = useUserStore((state: any) => state.setUserData);
  const setInfoData = useInfoStore((state: any) => state.setInfoData);
  const setLoading = useLoadingStore((state: any) => state.setLoading);
  const setVerify = useVerifyStore((state: any) => state.setVerify);

  const wallet = useTonWallet();
  const address = useTonAddress();

  const [progress, setProgress] = useState<number>(0);
  const [sequenceNumber, setSequenceNumber] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [boxNumber, setBoxNumber] = useState<number>(0);
  const [pockNumber, setPockNumber] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mysteryBoxPoint, setMysteryBoxPoint] = useState<number>(0);
  const [totalPoint, setTotalPoint] = useState<number>(0);

  const fetchUserInfo = async (userId: number) => {
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + `get-user/${userId}`)
        .then((res) => {
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
          setWalletAddress(response.wallet_address);
          setSequenceNumber(response.sequence_no);
          setVerify(response.verified);
          setBoxNumber(response.mystery_box);
          setTotalPoint(response.score);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFriendLists = async (userId: number) => {
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + `get-friends/${userId}`)
        .then((res) => { });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClickPoints = async (userId: number) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + `get-point/${userId}`)
      .then((res) => {
        setPockNumber(res.data.length);
      });
  };

  useEffect(() => {
    if (initData?.user?.id) {
      setUserData(
        initData.user.id,
        initData.user.username,
        initData.user.firstName,
        initData.user.lastName
      );
      fetchUserInfo(initData.user.id);
      fetchFriendLists(initData.user.id);
      fetchClickPoints(initData.user.id);
    }
  }, [initData, setUserData]);

  const { userId } = useUserStore((state: any) => ({
    userId: state.userId,
  }));

  const { loading } = useLoadingStore((state: any) => ({
    loading: state.loading,
  }));

  const { verify } = useVerifyStore((state: any) => ({
    verify: state.verify,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 2;
      });
    }, 40); // 40 ms to complete 100% in 4 seconds

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000); // 4 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const updateWalletAddress = async () => {
    await axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "connect-wallet", {
        user_id: userId,
        wallet_address: address,
      })
      .then((res) => {
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
      });
  };

  const handleOpenMysteryBox = () => {
    if (boxNumber === 0) return;

    setIsOpen(true);

    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "click-mystery", {
        user_id: userId,
      })
      .then((res) => {
        setMysteryBoxPoint(res.data.point);
        fetchUserInfo(userId);

        setTimeout(() => {
          setTotalPoint(res.data.totalPoint);
          setMysteryBoxPoint(0);
          setIsOpen(false);
        }, 4500);
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!walletAddress && wallet) {
        updateWalletAddress();
      }
    }, 2000); // 2 seconds

    // Cleanup the timeout if the effect re-runs or the component unmounts
    return () => clearTimeout(timeoutId);
  }, [walletAddress, wallet]);

  if (loading) {
    return <PreLoadingScreen progress={progress} />;
  }

  return (
    <>
      {!verify ? (
        <VerifyEnterScreen sequenceNumber={sequenceNumber} />
      ) : (
        <>
          <div className="flex flex-col justify-start bg-[#1CA774] items-center min-h-screen">
            <PandaClickPoint
              totalPoint={totalPoint}
              setTotalPoint={setTotalPoint}
              setPockNumber={setPockNumber}
            />
            {/* <MysteryBoxModal
              isOpen={isOpen}
              mysteryBoxPoint={mysteryBoxPoint}
            /> */}
          </div>
          <Navbar />
        </>
      )}
    </>
  );
}
