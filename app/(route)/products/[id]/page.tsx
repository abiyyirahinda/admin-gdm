'use client'
import TopNavbar from "@/components/TopNavbar";
import PageContent from "@/components/ui/PageContent";
import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { PageNavbarPrimaryButton } from "@/components/ui/PageNavbar";
import { Add, DirectSend, Image, Trash } from "iconsax-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

interface Image {
  url: string;
}

const DetailProduct = () => {
  const [images, setImages] = React.useState<Image[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState<string>("");
  const [productSize, setProductSize] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");

  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/edit-product/${productId}`);
        const product = await response.json();

        // Set form fields with fetched product data
        setProductName(product.productName);
        setProductPrice(product.productPrice);
        setProductCategory(product.productCategory);
        setProductSize(product.productSize);
        setProductDescription(product.productDescription);
        setImages(product.images || []);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product details.");
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleUpdateProduct = async () => {
    try {
      const body = {
        productName,
        productPrice,
        productCategory,
        productSize,
        productDescription,
        images,
      };

      const response = await fetch(`/api/edit-product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Product updated successfully.");
        router.push("/products");
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product.");
    }
  };

  const handleDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSuccess = (res: any) => {
    setImages((prevImages) => [...prevImages, { url: res.info.secure_url }]);
  };
  

  return (
    <div className="min-h-screen bg-white text-black">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700">Detail Product</h4>
        <div className="border p-4 md:p-6 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            {/* Input fields as you have them */}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Product Image
            </label>
            <CldUploadWidget onSuccess={handleSuccess}  uploadPreset="no6acgbu">
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
            {images.length > 0 && (
              <Carousel className="w-full mt-2">
                <CarouselContent className="-ml-1">
                  {images.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="p-1 group relative">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-0">
                            <img
                              src={image.url}
                              alt={`Uploaded ${index + 1}`}
                              className="object-cover h-full w-full rounded-lg"
                            />
                            <button
                              onClick={()=>handleDelete(index)}
                              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <Trash size={22} />
                            </button>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-200" />
                <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-200" />
              </Carousel>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Product Name
              </label>
              <input
              value={productName}
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                id="product-name-1"
                name="product-name-1"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Product Price
              </label>
              <input
              value={productPrice}
                onChange={(e) => setProductPrice(parseInt(e.target.value))}
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
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Category
              </label>
              <input
              value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                type="text"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500"
                placeholder="Enter product category"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Size
              </label>
              <input
              value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
                type="text"
                id="product-name-2"
                name="product-name-2"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500 "
                placeholder="Enter product price"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Description
              </label>
              <textarea
              value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="min-h-36 border text-gray-900 text-sm rounded-lg block w-full p-3 focus:border-violet-500 outline-none"
                placeholder="Enter product description"
                required
              ></textarea>
            </div>
          </div>
          <div className="flex items-end justify-end">
            <PageNavbarPrimaryButton onClick={handleUpdateProduct}>
              <DirectSend size={24} />
              <span className="hidden md:inline">Update Product</span>
            </PageNavbarPrimaryButton>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default DetailProduct;
