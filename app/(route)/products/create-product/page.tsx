"use client";
import TopNavbar from "@/components/TopNavbar";
import PageContent from "@/components/ui/PageContent";
import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { PageNavbarPrimaryButton } from "@/components/ui/PageNavbar";
import { Add, Image, Trash } from "iconsax-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface Image {
  url: string;
}
const CreateProdctPage: React.FC = () => {
  const [images, setImages] = React.useState<Image[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState(0);
  const [getCategory, setGetCategory] = useState([])
  const [productCategory, setProductCategory] = useState<string>("")
  const [productSize, setProductSize] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");

  const router = useRouter();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch("/api/get-category");
        const data = await response.json();
        setGetCategory(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);
  const handleSuccess = (res: any) => {
    setImages((prevImages) => [...prevImages, { url: res.info.secure_url }]);
  };

  const handleDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleCategoryChange = (value: string) => {
    setProductCategory(value);
  }
  const validateInputs = () => {
    console.log(productCategory)
    if (images.length === 0) {
      toast.error("At least one product image is required.");
      return false;
    }
    if (!productName.trim()) {
      toast.error("Product name is required.");
      return false;
    }
    if (productPrice <= 0) {
      toast.error("Product price must be greater than zero.");
      return false;
    }
    if (!productCategory) {
      toast.error("Product category is required.");
      return false;
    }
    if (!productSize.trim()) {
      toast.error("Product size is required.");
      return false;
    }
    if (!productDescription.trim()) {
      toast.error("Product description is required.");
      return false;
    }

    return true;
  };

  const createProduct = async () => {
    if (!validateInputs()) return;
    try {
      const response = await fetch("/api/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          productPrice,
          productCategory,
          productSize,
          productDescription,
          images,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const result = await response.json();
      toast.success("Product created successfully!");
      console.log("Result:", result);
      router.push("/products");
      return result;
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error creating product!");
    }
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700">Create Product</h4>
        <div className="border p-4 md:p-6 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">{/* Input fields as you have them */}</div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Product Image</label>
            <CldUploadWidget onSuccess={handleSuccess} uploadPreset="no6acgbu">
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
            {images.length > 0 && (
              <Carousel className="w-full mt-2">
                <CarouselContent className="-ml-1">
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <div className="p-1 group relative">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-0">
                            <img src={image.url} alt={`Uploaded ${index + 1}`} className="object-cover h-full w-full rounded-lg" />
                            <button
                              onClick={() => handleDelete(index)}
                              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
              <label className="block mb-2 text-sm font-medium text-gray-600 ">Product Name</label>
              <input
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
              <label className="block mb-2 text-sm font-medium text-gray-600">Product Price</label>
              <input
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
              <label className="block mb-2 text-sm font-medium text-gray-600 ">Category</label>
              {/* <input
                onChange={(e) => setProductCategory(e.target.value)}
                type="text"
                className=" border text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none focus:border-violet-500"
                placeholder="Enter product category"
                required
              /> */}
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {getCategory.map((category: any) => (
                      <SelectItem key={category._id}  value={category._id}>
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600">Size</label>
              <input
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
              <label className="block mb-2 text-sm font-medium text-gray-600 ">Description</label>
              <textarea
                onChange={(e) => setProductDescription(e.target.value)}
                className="min-h-36 border text-gray-900 text-sm rounded-lg block w-full p-3 focus:border-violet-500 outline-none"
                placeholder="Enter product description"
                required></textarea>
            </div>
          </div>
          <div className="flex items-end justify-end">
            <PageNavbarPrimaryButton onClick={createProduct}>
              <Add size={24} />
              <span className="hidden md:inline">Create Product</span>
            </PageNavbarPrimaryButton>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default CreateProdctPage;
