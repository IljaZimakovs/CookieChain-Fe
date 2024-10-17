"use client";

import React, { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Input } from "./ui/input";
import { ClapSpinner } from "react-spinners-kit";
import toast, { Toaster } from "react-hot-toast";
import useUserStore from "@/store/useStore";
import axios from "axios";

interface T_VerifyModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  verified: boolean;
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setIdName: React.Dispatch<React.SetStateAction<string>>;
  handleOpenChange: () => void;
}

const VerifyModal: React.FC<T_VerifyModal> = ({
  isOpen,
  setIsOpen,
  verified,
  setVerified,
  setIdName,
  handleOpenChange,
}) => {
  const { userId, firstName, lastName } = useUserStore((state: any) => ({
    userId: state.userId,
    firstName: state.firstName,
    lastName: state.lastName,
  }));

  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isToast, setIsToast] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleVerify = () => {
    if (username.length === 0) {
      setError("Username is required");
      return;
    }
    setIsLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "verify-username", {
        user_id: userId,
        username: username,
      })
      .then((res) => {
        setIsToast(true);
        toast.success("Bind successful", {
          style: {
            background: "#000000",
            border: "1px solid #444444",
            padding: "5px 12px",
            color: "#fff",
            fontFamily: "Rubik",
          },
          iconTheme: {
            primary: "#00CB39",
            secondary: "#FFFAEE",
          },
        });
        setIdName(username);
        setIsLoading(false);

        setTimeout(() => {
          setIsToast(false);
          setVerified(true);
        }, 1000);
      });
  };

  useEffect(() => {
    if (username.length > 0) {
      setError("");
    }
  }, [username]);

  useEffect(() => {
    setUsername(firstName + " " + lastName);
  }, []);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      fixed={true}
      closeThreshold={1}
      // disablePreventScroll={true}
      dismissible={true}
      nested={false}
    // preventScrollRestoration={true}
    >
      <Toaster position="top-center" reverseOrder={isToast} />
      <Drawer.Trigger asChild className="w-full">
        <div className="flex my-4 justify-center">
          <button className="flex w-[276px] h-10 justify-center items-center text-[#0D524D] font-rubik bg-white rounded-full text-[14px] font-medium mt-6">
            Enter
          </button>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 bg-black/40 z-20"
          style={{
            backdropFilter: "blur(0.9px)",
          }}
        />
        <Drawer.Content className="bg-transparent flex max-w-xl mx-auto flex-col  h-[294px] fixed inset-x-0 bottom-5 z-50 mt-20 text-black font-rubik px-2">
          <div className="bg-white rounded-t-[30px] px-6 py-14">
            <div className="flex w-full flex-col justify-center items-center gap-1">
              <p className="text-[20px] font-medium font-rubik text-center">Welcome to CookieChain</p>
              <p className="text-[16px] font-rubik text-center mt-1">
                Please enter your name below to get an exclusive card
              </p>
              <Input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder={error.length > 0 ? error : "Enter username"}
                className={`mt-6 bg-[#F3FAE5] ${error.length > 0
                  ? "border border-[#E6EED4] placeholder:text-red-500 focus:outline-[#E6EED4]" // outline and placeholder red when error
                  : "focus:outline-[#E6EED4] placeholder:text-gray-500" // default outline and placeholder color
                  }`}
                style={{
                  outlineColor: error.length > 0 ? 'red' : '#E6EED4', // fallback for outline color
                }}
              />

              <button
                onClick={handleVerify}
                className="flex w-full h-10 justify-center items-center text-white font-rubik bg-[#189869] rounded-full text-base mt-10 transition-all duration-100"
              >
                {isLoading ? (
                  <ClapSpinner
                    size={20}
                    frontColor="#FFFFFF"
                    backColor="#FFFFFF"
                    color="#FFFFFF"
                    loading={isLoading}
                  />
                ) : (
                  <p className="font-rubik text-[14px] transition-all duration-100">Enter</p>
                )}
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default VerifyModal;
