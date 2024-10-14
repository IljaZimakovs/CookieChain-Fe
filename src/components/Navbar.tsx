"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Icons } from "./Icons";

interface Route {
  path: string;
  title: string;
  icon?: any;
}

export const route: Route[] = [
  {
    path: "/",
    title: "Home",
    icon: (color: string) => <Icons.navigator.home color={color} />,
  },
  {
    path: "/quests",
    title: "Quests",
    icon: (color: string) => <Icons.navigator.quest color={color} />,
  },
  {
    path: "/friends",
    title: "Friends",
    icon: (color: string) => <Icons.navigator.friend color={color} />,
  },
  {
    path: "/IDcard",
    title: "ID Card",
    icon: (color: string) => <Icons.navigator.card color={color} />,
  },
];

export const Navbar = () => {
  const [active, setActive] = useState(-1);

  const router = useRouter();
  const pathname = usePathname();

  const updateActiveState = useCallback(() => {
    switch (pathname) {
      case "/":
        setActive(0);
        break;
      case "/quests":
        setActive(1);
        break;
      case "/friends":
        setActive(2);
        break;
      case "/IDcard":
        setActive(3);
        break;
      default:
        setActive(-1);
    }
  }, [pathname]);

  useEffect(() => {
    updateActiveState();
  }, [pathname, updateActiveState]);

  return (
    <div
      className={`fixed bottom-0 z-20 bg-[#189869] py-4 w-full px-4 ${
        active === 0 || active === 1 ? "bg-[#189869]" : ""
      }`}
    >
      <div className="rounded-lg bg-[#189869] py-3 gap-1 right-4 left-4 flex justify-between">
        {route.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                router.push(item.path);
              }}
              className={`relative flex cursor-pointer flex-col items-center justify-center w-full py-1.5 gap-1.5 rounded-lg ${
                active === index
                  ? "bg-[#22CA8C] !text-white"
                  : "bg-transparent text-[#D9D9D9]"
              }`}
            >
              {item.icon(active === index ? "text-gray-300" : "white")}
              <span
                className={`z-10 text-sm leading-tight font-mitr ${
                  active === index ? "text-white" : "text-[#D9D9D9]"
                }`}
              >
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
