"use client";

import React, { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const InviteButton = (userId: any) => {
  const [isToast, setIsToast] = useState<boolean>(false);
  const [copySupported, setCopySupported] = useState(false);

  const inviteLink = `https://t.me/share/url?text=Join%20me%20in%20Panda%20Chain!&url=https://t.me/pandachain_bot?start=${userId.userId}`;

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      setCopySupported(true);
    }
  }, []);

  const handleCopy = () => {
    setIsToast(true);
    toast.success("Link copied to clipboard", {
      style: {
        background: "#000000",
        border: "1px solid #444444",
        padding: "5px 12px",
        color: "#fff",
      },
      iconTheme: {
        primary: "#00CB39",
        secondary: "#FFFAEE",
      },
    });

    if (!copySupported) {
      const textArea = document.createElement("textarea");
      textArea.value = `https://t.me/pandachain_bot?start=${userId.userId}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      console.log("Copied to clipboard");
    } else {
      navigator.clipboard
        .writeText(`https://t.me/pandachain_bot?start=${userId.userId}`)
        .then(() => {
          console.log("Copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }

    setTimeout(() => {
      setIsToast(false);
    }, 1500);
  };

  return (
    <div className="flex w-full justify-center gap-4 mt-6">
      <Toaster position="top-center" reverseOrder={isToast} />
      <div className="w-[190px]">
        <a
          href={inviteLink}
          className="flex-1 flex h-10 bg-white text-black text-[14px] font-semibold font-rubik rounded-full justify-center items-center"
        >
          Invite Friends
        </a>
      </div>
      <button
        onClick={handleCopy}
        className="flex w-10 h-10 bg-white rounded-full justify-center items-center"
      >
        <IoCopyOutline className="text-black text-xl" />
      </button>
    </div>
  );
};

export default InviteButton;
