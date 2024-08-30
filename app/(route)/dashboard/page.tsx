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
import { Add, CalendarEdit, DirectNotification, Notification, SearchNormal1, Setting4 } from "iconsax-react";
import PageContent from "@/components/ui/PageContent";
import { OutlineButton } from "@/components/ui/Button";
import Sidebar from "@/components/ui/Sidebar";
import AppLayout from "@/components/layout";
const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);
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
    <AppLayout>

    <div className="bg-white min-h-screen">
      {/* <Sidebar /> */}
      <PageNavbar>
        <PageNavbarLeftContent>
          {/* <div className='flex items-center justify-between gap-2'> */}
          <Image src={ProfileImage} alt="User" width={40} height={40} className="rounded-full" />
          <div className="">
            <p className="text-sm font-semibold text-gray-800">Steve Jobs</p>
            <p className="text-xs font-medium text-gray-500">Welcome back</p>
          </div>
          {/* </div> */}
        </PageNavbarLeftContent>

        <PageNavbarRightContent>
          <PageNavbarIconButton className="all-center h-8 w-8 duration-200 hover:bg-gray-100 rounded-lg">
            <SearchNormal1 size={16} />
          </PageNavbarIconButton>

          <PageNavbarIconButton className="all-center h-8 w-8 duration-200 hover:bg-gray-100 rounded-lg">
            <DirectNotification size={16} />
          </PageNavbarIconButton>

          <OutlineButton className="h-8 w-8 gap-1 md:w-auto md:border py-1 px-2 duration-200 hover:bg-gray-100 rounded-lg text-xs all-center">
            <div className="flex gap-2">

            <CalendarEdit size={16} />
            <span className="hidden md:inline">Schedule</span>
            </div>
          </OutlineButton>

          <PageNavbarPrimaryButton className="h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center">
            <Add size={16} />
            <span className="hidden md:inline">Create request</span>
          </PageNavbarPrimaryButton>
        </PageNavbarRightContent>
      </PageNavbar>

      <PageContent>
        <div className="space-y-4 columns-1 sm:columns-2 lg:columns-3">
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
        </div>
      </PageContent>
    </div>
    </AppLayout>
  );

  // return (
  //   <div>
  //       <DashboardComp />
  //   </div>
  // )
};

export default DashboardPage;
