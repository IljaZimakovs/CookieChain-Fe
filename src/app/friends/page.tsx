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
        <h2 className="text-[24px] text-white py-10 font-rubik font-medium text-center">Friends</h2>
        <div className="flex w-full flex-col items-center px-4 pt-2 pb-32">
          <div className="flex w-full flex-col gap-4 items-start justify-center">
            <p className="w-full text-[24px] text-white text-center font-[500] font-Rubik">
              Invite friends and
            </p>
            <p className="w-full text-white text-[24px] text-center font-[500] font-Rubik">
              get more
            </p>
            <div className="flex justify-center items-center w-full pt-4 gap-2">
              <p className="text-white text-[20px] font-medium font-Rubik mb-1">
                MYSTERYBOX
              </p>
              <Image
                src={"/images/invite-box.png"}
                alt="Invite Box"
                width={29}
                height={27}
              />
            </div>
            <div className="w-full py-8 flex justify-center">
              <hr className="border-0 w-[207px] h-[1.5px] bg-gradient-to-r from-[#1EB17B] via-[#24DF9A] to-[#1EB17B]" />
            </div>
          </div>
          <p className="font-Rubik text-[20px] text-white text-center font-semibold mb-2">
            Cookie Invited: {firendLists.length}
          </p>
          <p className="font-Rubik text-[16px] leading-[20px] text-white text-center mt-1">
            Every succussful invitation gives you
          </p>
          <p className="font-Rubik text-[16px] leading-[20px] text-white text-center mt-1">
            1 MYSTERY BOX
          </p>
          <InviteButton userId={userId} />
          <Image
            className="mt-7 mb-4"
            src={"/images/invite_friend.png"}
            alt="Invite Cookie"
            width={337}
            height={224}
          />
          <FriendLists firendLists={firendLists} />
        </div>
      </div>
      <Navbar />
    </>
  );
}
