"use client";
import TopNavbar from "@/components/TopNavbar";
import { DataTable } from "@/components/ui/data-table";
import PageContent from "@/components/ui/PageContent";
import { PageNavbarPrimaryButton } from "@/components/ui/PageNavbar";
import { Add } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { columns } from "./components/columns";
import Loading from "@/components/ui/loading";

interface CarProps {
  categoryName: string;
  createdAt: string;
}

const CateogryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoadingTable(true);
        const response = await fetch("/api/get-category");
        const data = await response.json();
        const convertedData = data.categories.map((category: CarProps) => ({
          ...category,
          createdAt: moment(category.createdAt).format("DD MMMM, YYYY"),
          categoryName: category.categoryName,
        }));
        setCategories(convertedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingTable(false);
      }
    };

    getCategories();
  }, []);

  const createCategory = () => {
    router.push("/category/create-category");
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700 mb-4">Category Management</h4>
        <PageNavbarPrimaryButton onClick={createCategory}>
          <Add size={20} />
          <span className="hidden md:inline">Create Category</span>
        </PageNavbarPrimaryButton>
        {loadingTable ? <Loading /> : <DataTable columns={columns} data={categories} />}
      </PageContent>
    </div>
  );
};

export default CateogryPage;
