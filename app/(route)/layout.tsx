"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/ui/Sidebar";
import { useCentralStore } from "@/Store";
import { signIn, useSession } from "next-auth/react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useCentralStore();
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="https://garam2musim.com/wp-content/uploads/2022/06/Picture1.png" alt="loading" className="animate-breathing" />
      </div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${isSidebarOpen ? "overflow-hidden" : ""} h-screen`}>
      {/* backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsSidebarOpen(false)}
            className="bg-black/60 absolute top-0 left-0 md:hidden w-full h-screen z-20"
          />
        )}
      </AnimatePresence>

      {/* mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
            className="absolute md:hidden z-30 top-0 left-0">
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-[240px_1fr] w-screen overflow-x-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="w-full overflow-x-auto max-w-[1440px] mx-auto">{children}</div>
      </div>
    </motion.div>
  );
};

export default AppLayout;
