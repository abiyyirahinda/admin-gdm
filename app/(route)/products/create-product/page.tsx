"use client";
import TopNavbar from "@/components/TopNavbar";
import PageContent from "@/components/ui/PageContent";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";

interface Image {
  url: string;
}
const CreateProdctPage: React.FC = () => {
  const [image, setImage] = React.useState<Image | null>(null);

  const handleSuccess = (res: any) => {
    setImage({ url: res.info.secure_url });
  };
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return (
    <div className="min-h-screen bg-white text-black">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700">Create Product</h4>
        <div className="border p-4 md:p-6 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">{/* Input fields as you have them */}</div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Product Image</label>
            <CldUploadWidget onSuccess={handleSuccess} uploadPreset='no6acgbu'>
              {({ open }) => {
                return <button onClick={() => open()}>Upload an Image</button>;
              }}
            </CldUploadWidget>
            {image && (
              <div className="mt-4">
                <img src={image.url} alt="Uploaded" className="max-w-xs" />
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">Product Name</label>
              <input
                type="text"
                id="product-name-1"
                name="product-name-1"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600">Product Price</label>
              <input
                type="number"
                id="product-name-2"
                name="product-name-2"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500 "
                placeholder="Enter product price"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">Category</label>
              <input
                type="text"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500"
                placeholder="Enter product category"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600">Size</label>
              <input
                type="number"
                id="product-name-2"
                name="product-name-2"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500 "
                placeholder="Enter product price"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">Description</label>
              <textarea
                className="min-h-36 border text-gray-900 text-sm rounded-lg block w-full p-3 focus:border-violet-500 outline-none"
                placeholder="Enter product description"
                required></textarea>
            </div>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default CreateProdctPage;
