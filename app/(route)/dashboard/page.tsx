"use client";
import DashboardComp from "@/components/dashboard";
import Providers from "@/components/providers";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarPrimaryButton,
  PageNavbarRightContent,
} from "@/components/ui/PageNavbar";
import Image from "next/image";
import ProfileImage from "@/components/assets/profile.png";
import {
  Add,
  CalendarEdit,
  DirectNotification,
  Notification,
  SearchNormal1,
  Setting4,
} from "iconsax-react";
import PageContent from "@/components/ui/PageContent";
import { OutlineButton } from "@/components/Button";
import Sidebar from "@/components/ui/Sidebar";
import AppLayout from "@/components/layout";
import TraningAnalysis from "@/components/ui/TraningAnalysis";
import TopNavbar from "@/components/TopNavbar";
const DashboardPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <TopNavbar />

      <PageContent>
        <div className="border p-2 rounded-2xl"></div>
        {/* <div className="space-y-4 columns-1 sm:columns-2 lg:columns-3">
        </div> */}
        {/* <div className='break-inside-avoid-column space-y-4'>
                    <TraningAnalysis />
                </div> */}
        {/* 
                <div className='break-inside-avoid-column space-y-4'>
                    <CourseProgress />
                </div>

                <div className='break-inside-avoid-column space-y-4'>
                    <EmployeeSpotlight />
                </div>

                <div className='break-inside-avoid-column space-y-4'>
                    <TimeTracker />
                </div>

                <div className='break-inside-avoid-column space-y-4'>
                    <Notes/>
                </div>

                <div className='break-inside-avoid-column space-y-4'>
                    <StatusTracker />
                </div>

                <div className='break-inside-avoid-column space-y-4'>
                    <CurrentProject />
                </div> */}
      </PageContent>
    </div>
  );

  // return (
  //   <div>
  //       <DashboardComp />
  //   </div>
  // )
};

export default DashboardPage;
