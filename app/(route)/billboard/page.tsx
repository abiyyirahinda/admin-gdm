"use client";
import TopNavbar from "@/components/TopNavbar";
import PageContent from "@/components/ui/PageContent";
import { PageNavbarPrimaryButton } from "@/components/ui/PageNavbar";
import { Add } from "iconsax-react";
import { useRouter } from "next/navigation";
import React from "react";

const BillboardPage = () => {
    const router = useRouter();

    const createBillboard = () => {
        router.push("/billboard/create-billboard");
    };
  return (
    <div className="bg-white min-h-screen">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700 mb-4">Billboard Management</h4>
        <PageNavbarPrimaryButton onClick={createBillboard}>
          <Add size={20} />
          <span className="hidden md:inline">Create Billboard</span>
        </PageNavbarPrimaryButton>
      </PageContent>
    </div>
  );
};

export default BillboardPage;
