"use client";
import React, { useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import PageContent from "@/components/ui/PageContent";
import { PageNavbarPrimaryButton } from "@/components/ui/PageNavbar";
import { Add } from "iconsax-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const router = useRouter()
  const createCategory = async () => {
    try {
        const response = await fetch("/api/create-category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName }),
        });
        if (!response.ok) {
          throw new Error("Failed to create category");
        }
        const result = await response.json();
        toast.success("Category created successfully!");
        router.push("/category");
        return result;
    } catch (error) {
        toast.error("Failed to create category");
        console.error("Error creating category:", error);
        
    }
  }
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700">Create Category</h4>
        <div className="border p-4 md:p-6 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">Category Name</label>
              <input
                onChange={(e) => setCategoryName(e.target.value)}
                type="text"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500"
                placeholder="Garam Konsumsi"
                required
              />
            </div>
          </div>
          <div className="flex items-end justify-end">
            <PageNavbarPrimaryButton style={{ width: "135px" }} onClick={createCategory} disabled={loadingButton}>
              {loadingButton ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                </div>
              ) : (
                <>
                  <Add size={24} />
                  <span className="hidden md:inline">Create</span>
                </>
              )}
            </PageNavbarPrimaryButton>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default CreateCategory;
