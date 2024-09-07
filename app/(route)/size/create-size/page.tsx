"use client";
import React, { useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import PageContent from "@/components/ui/PageContent";
import { PageNavbarPrimaryButton } from "@/components/ui/PageNavbar";
import { Add } from "iconsax-react";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
const CreateSize = () => {
  const [sizeUnit, setSizeUnit] = useState<string>("");
  const [sizeValue, setSizeValue] = useState<number>(0);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const router = useRouter()
  const createSize = async () => {
    try {
      setLoadingButton(true);
      const response = await fetch("/api/create-size", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sizeUnit, sizeValue }),
      });
      if (!response.ok) {
        throw new Error("Failed to create size");
      }
      const result = await response.json();
      toast.success("Size created successfully!");
      router.push("/size");
      return result;
    } catch (error) {
      console.error("Error creating size:", error);
      toast.error("Failed to create size");
    } finally {
      setLoadingButton(false);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700">Create Size</h4>
        <div className="border p-4 md:p-6 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">Size Unit</label>
              <Select onValueChange={(value) => setSizeUnit(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Size Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ml">mililiter</SelectItem>
                    <SelectItem value="gr">gram</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600">Size Value</label>
              <input
                onChange={(e) => setSizeValue(parseInt(e.target.value))}
                type="number"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500 "
                placeholder="500"
                required
              />
            </div>
          </div>
          <div className="flex items-end justify-end">
            <PageNavbarPrimaryButton style={{ width: "135px" }} onClick={createSize} disabled={loadingButton}>
              {loadingButton ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                </div>
              ) : (
                <>
                  <Add size={24} />
                  <span className="hidden md:inline">Create Size</span>
                </>
              )}
            </PageNavbarPrimaryButton>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default CreateSize;
