"use client";
import TopNavbar from "@/components/TopNavbar";
import PageContent from "@/components/ui/PageContent";
import React from "react";

const createBillboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700">Create Billboard</h4>
      </PageContent>
    </div>
  );
};

export default createBillboard;
