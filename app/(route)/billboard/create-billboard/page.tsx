"use client";
import TopNavbar from "@/components/TopNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import PageContent from "@/components/ui/PageContent";
import { PageNavbarPrimaryButton } from "@/components/ui/PageNavbar";
import { Add, Image, Trash } from "iconsax-react";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import toast from "react-hot-toast";

const createBillboard = () => {
  const [image, setImages] = useState<string>("");
  const [billboardLabel, setBillboardLabel] = useState<string>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const handleSuccess = (res: any) => {
    setImages(res.info.secure_url);
  };
  const handleDelete = () => {
    setImages("");
  };

  const createBillboard = async () => {
    try {
      setLoadingButton(true);
      const response = await fetch("/api/create-billboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          billboardLabel,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create billboard");
      }
      const result = await response.json();
      setLoadingButton(false);
      toast.success("Billboard created successfully!");
      return result;
    } catch (error) {
      toast.error("Error creating billboard!");
      setLoadingButton(false);
      console.error("Error creating billboard:", error);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700">Create Billboard</h4>
        <div className="border p-4 md:p-6 rounded-2xl">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Billboard Image</label>
            <CldUploadWidget onSuccess={handleSuccess} uploadPreset="no6acgbu" options={{ maxFiles: 1 }}>
              {({ open }) => {
                return (
                  <PageNavbarPrimaryButton
                    onClick={() => open()}
                    className="h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center">
                    <Image size={16} />
                    <span className="hidden md:inline">Upload an Image</span>
                  </PageNavbarPrimaryButton>
                );
              }}
            </CldUploadWidget>
            {image && (
              <div className="w-full mt-2">
                <div className="p-1 group relative max-w-xs">
                  <Card className="">
                    <CardContent className="flex items-center justify-center p-0">
                      <img
                        src={image} // Hanya menampilkan gambar pertama (karena hanya boleh 1 gambar)
                        alt="Uploaded Image"
                        className="object-cover h-full w-full rounded-lg"
                      />
                      <button
                        onClick={() => handleDelete()} // Hapus gambar pertama (karena hanya 1 gambar)
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Trash size={22} />
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">Billboard Label</label>
              <input
                onChange={(e) => setBillboardLabel(e.target.value)}
                type="text"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500"
                placeholder="'Promo Billboard'"
                required
              />
            </div>
          </div>
          <div className="flex items-end justify-end">
            <PageNavbarPrimaryButton style={{width: "135px"}} onClick={createBillboard} disabled={loadingButton}>
              {loadingButton ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                </div>
              ) : (
                <>
                  <Add size={24} />
                  <span className="hidden md:inline">Create Billboard</span>
                </>
              )}
              
            </PageNavbarPrimaryButton>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default createBillboard;
