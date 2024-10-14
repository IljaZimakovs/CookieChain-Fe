import Image from "next/image";
import React from "react";

const FriendLists = (firendLists: any) => {
  return (
    <div className="flex w-full flex-col gap-2 bg-background mt-6 rounded-lg p-2 px-4">
      <div className="w-full justify-center font-mitr">
        <p className="text-gray-700 text-lg text-center">Friend Lists</p>
        <hr className="border border-t-[#787878] mt-2 mb-1 border-dashed"></hr>
      </div>
      {firendLists.firendLists.length > 0 ? (
        firendLists.firendLists.map((friend: any, index: number) => (
          <div
            key={index}
            className="flex w-full justify-between items-center gap-2 font-mitr text-black font-semibold"
          >
            <div className="flex justify-start items-center gap-3">
              <p className="text-lg">{index + 1}</p>
              <Image
                src={"/images/panda.jpg"}
                alt="Cookie Image"
                width={36}
                height={36}
              />
              <p className="text-base font-normal">
                {friend?.username
                  ? friend?.username
                  : friend?.first_name + friend?.last_name}
              </p>
            </div>
            <p className="">{friend?.score}</p>
          </div>
        ))
      ) : (
        <p className="text-black text-lg text-center font-mitr">No friend</p>
      )}
    </div>
  );
};

export default FriendLists;
