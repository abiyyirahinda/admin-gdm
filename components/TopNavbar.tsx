"use client";
import React from "react";
import { OutlineButton } from "@/components/Button";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarPrimaryButton,
  PageNavbarRightContent,
} from "@/components/ui/PageNavbar";
import {
  Add,
  CalendarEdit,
  DirectNotification,
  Logout,
  SearchNormal1,
} from "iconsax-react";
import ProfileImage from "@/components/assets/profile.png";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
const TopNavbar = () => {
  const { data: session } = useSession();
  return (
    <>
      <PageNavbar>
        <PageNavbarLeftContent>
          {/* <div className='flex items-center justify-between gap-2'> */}
          <Image
            src={ProfileImage}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="">
            <p className="text-sm font-semibold text-gray-800">
              {session?.user?.email}
            </p>
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

          <PageNavbarPrimaryButton
            onClick={() => signOut()}
            className="h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center"
          >
            <Logout size={16} />
            <span className="hidden md:inline">Sign Out</span>
          </PageNavbarPrimaryButton>
        </PageNavbarRightContent>
      </PageNavbar>
    </>
  );
};

export default TopNavbar;
