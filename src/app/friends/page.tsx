"use client";

import useUserStore from "@/store/useStore";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import InviteButton from "@/components/InviteButton";
import FriendLists from "@/components/FriendLists";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const { userId, userName } = useUserStore((state: any) => ({
    userId: state.userId,
    userName: state.userName,
  }));

  const [firendLists, setFriendLists] = useState<any>([]);

  const fetchFriendLists = async (userId: number) => {
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + `get-friends/${userId}`)
        .then((res) => {
          const response = res.data;
          setFriendLists(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFriendLists(userId);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#1CA774]">
        <div className="flex w-full font-mitr px-6 py-14">
          <p className="w-full text-white text-center text-base text-[36px]">Quests</p>
        </div>
        <div className="flex w-full flex-col items-center px-4 pt-4 pb-32">
          <div className="flex w-full flex-col gap-1 items-start justify-center">
            <p className="w-full text-white text-[28px] text-center font-[500] font-mitr">
              Invite friends and get more
            </p>
            <div className="flex justify-center w-full gap-2 items-end">
              <p className="text-white text-[28px] font-[500] font-mitr mb-1">
                Cookie BOX
              </p>
              <Image
                src={"/images/invite-box.png"}
                alt="Invite Box"
                width={55}
                height={53}
              />
            </div>
          </div>
          <Image
            className="mt-7 mb-4"
            src={"/images/invite_friend.png"}
            alt="Invite Panda"
            width={307}
            height={300}
          />
          <p className="font-mitr text-xl text-white text-center font-semibold">
            Panda Invited: {firendLists.length}
          </p>
          <p className="font-mitr text-base leading-[20px] text-white text-center mt-1">
            Every succussful invitation gives you 1 Cookie BOX
          </p>
          <InviteButton userId={userId} />
          <FriendLists firendLists={firendLists} />
        </div>
      </div>
      <Navbar />
    </>
  );
}
