"use client";
import TopNavbar from "@/components/TopNavbar";
import PageContent from "@/components/ui/PageContent";
import { PageNavbarPrimaryButton } from "@/components/ui/PageNavbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Add } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BillboardPage = () => {
  const [billboards, setBillboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countSkeleton, setCountSkeleton] = useState<number>(10);
  const router = useRouter();

  const createBillboard = () => {
    router.push("/billboard/create-billboard");
  };
  useEffect(() => {
    const getBillboards = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-billboard");
        const data = await response.json();
        setBillboards(data.billboards);
        setCountSkeleton(data.billboards.length);
      } catch (error) {
        console.error("Error fetching billboards:", error);
      } finally {
        setLoading(false);
      }
    };
    getBillboards();
  }, []);
  return (
    <div className="bg-white min-h-screen">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700 mb-4">Billboard Management</h4>
        <PageNavbarPrimaryButton onClick={createBillboard}>
          <Add size={20} />
          <span className="hidden md:inline">Create Billboard</span>
        </PageNavbarPrimaryButton>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {loading
            ? [...Array(countSkeleton)].map((_, index) => (
                <div key={index} className="rounded-lg border overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 animate-pulse min-h-[200px]"></div>
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse mt-4 w-full"></div>
                  </div>
                </div>
              ))
            : billboards.map((billboard: any) => (
                <div key={billboard._id} className="group relative">
                  <div className="aspect-square w-full overflow-hidden rounded-md">
                    <img src={billboard.image} alt="image" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="mt-4 flex flex-col justify-between">
                    <h1 className="font-semibold line-clamp-1">{billboard.billboardLabel}</h1>

                    <PageNavbarPrimaryButton onClick={() => router.push(`/billboard/${billboard._id}`)} className="w-full">
                      View Details
                    </PageNavbarPrimaryButton>
                  </div>
                </div>
              ))}
        </div>
      </PageContent>
    </div>
  );
};

export default BillboardPage;
