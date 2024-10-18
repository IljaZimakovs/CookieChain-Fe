"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface T_MysteryBoxModal {
  isOpen: boolean;
  mysteryBoxPoint: number;
}

const MysteryBoxModal: React.FC<T_MysteryBoxModal> = ({
  isOpen,
  mysteryBoxPoint,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 2000);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1 }}
          className="w-full min-h-screen bg-[url(/images/sky_effect.png)] bg-cover bg-no-repeat fixed top-0 left-0 z-50"
        >
          <motion.div
            className="flex w-full flex-col items-center font-rubik text-2xl absolute top-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <p>Congrats you won</p>
            <span className="flex text-2xl items-center gap-2">
              <p className="text-3xl text-second_yellow">
                {mysteryBoxPoint + " "}
              </p>
              <p className="text-2xl -mt-1">points</p>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MysteryBoxModal;
