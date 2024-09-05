"use client";
import TopNavbar from "@/components/TopNavbar";
import { Card, CardContent } from "@/components/ui/card";
import PageContent from "@/components/ui/PageContent";
import { PageNavbarPrimaryButton } from "@/components/ui/PageNavbar";
import { Add, DirectSend, Image, Trash } from "iconsax-react";
import { CldUploadWidget } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DetailBillboard = () => {
  const [image, setImages] = useState<string>("");
  const [billboardLabel, setBillboardLabel] = useState<string>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  
  const router = useRouter();
  const params = useParams();
  const billboardId = params.id;

  useEffect(() => {
    const fetchBillboard = async () => {
      try {
        const response = await fetch(`/api/edit-billboard/${billboardId}`);
        const data = await response.json();
        setImages(data.image);
        console.log(image);
        setBillboardLabel(data.billboardLabel);
      } catch (error) {
        console.error("Error fetching billboard:", error);
      }
    };
    fetchBillboard();
  }, [billboardId]);

  const handleSuccess = (res: any) => {
    setImages(res.info.secure_url);
  };
  const handleDelete = () => {
    setImages("");
  };
  const handleUpdateBillboard = async () => {
    if (!billboardLabel) {
      toast.error("Billboard label is required");
      return;
    }

    try {
      const body = {
        billboardLabel,
        image,
      };

      const response = await fetch(`/api/edit-billboard/${billboardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success("Billboard updated successfully");
        router.push("/billboard");
      } else {
        toast.error("Failed to update billboard");
      }
    } catch (error) {
      console.error("Error updating billboard:", error);
      toast.error("Failed to update billboard");
    }
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700">Detail Billboard</h4>
        <div className="border p-4 md:p-6 rounded-2xl">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Billboard Image
            </label>
            <CldUploadWidget
              onSuccess={handleSuccess}
              uploadPreset="no6acgbu"
              options={{ maxFiles: 1 }}
            >
              {({ open }) => {
                return (
                  <PageNavbarPrimaryButton
                    onClick={() => open()}
                    className="h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center"
                  >
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
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <img
                        src={image} // Hanya menampilkan gambar pertama (karena hanya boleh 1 gambar)
                        alt="Uploaded Image"
                        className="object-cover h-full w-full rounded-lg"
                      />
                      <button
                        onClick={() => handleDelete()} // Hapus gambar pertama (karena hanya 1 gambar)
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
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
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Billboard Label
              </label>
              <input
                onChange={(e) => setBillboardLabel(e.target.value)}
                value={billboardLabel}
                type="text"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500"
                placeholder="'Promo Billboard'"
                required
              />
            </div>
          </div>

          <div className="flex items-end justify-end">
            <PageNavbarPrimaryButton onClick={handleUpdateBillboard}>
              <DirectSend size={24} />
              <span className="hidden md:inline">Update Billboard</span>
            </PageNavbarPrimaryButton>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default DetailBillboard;
