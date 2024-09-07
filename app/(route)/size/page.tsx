"use client";
import TopNavbar from "@/components/TopNavbar";
import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import PageContent from "@/components/ui/PageContent";
import { PageNavbarPrimaryButton } from "@/components/ui/PageNavbar";
import { Add } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { columns } from "./components/columns";
import moment from "moment";

interface SizeProps {
  sizeValue: number;
  sizeUnit: string;
  createdAt: string;
}
const SizePage = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [sizes, setSizes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getSizes = async () => {
      try {
        setLoadingTable(true);
        const response = await fetch("/api/get-size");
        const data = await response.json();
        const convertedData = data.map((size: SizeProps) => ({
          ...size,
          createdAt: moment(size.createdAt).format("DD MMMM, YYYY"),
          sizeUnit: size.sizeUnit,
          sizeValue: size.sizeValue,
        }));
        setSizes(convertedData);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      } finally {
        setLoadingTable(false);
      }
    };

    getSizes();
  }, []);
  const createSizePage = () => {
    router.push("/size/create-size");
  };
  return (
    <div className="min-h-screen">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700 mb-4">Size Management</h4>
        <PageNavbarPrimaryButton onClick={createSizePage}>
          <Add size={20} />
          <span className="hidden md:inline">Create Size</span>
        </PageNavbarPrimaryButton>
        {loadingTable ? 
        <Loading />
        : 
        <DataTable columns={columns} data={sizes}/>
        }
      </PageContent>
    </div>
  );
};

export default SizePage;
