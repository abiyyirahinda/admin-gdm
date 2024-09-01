"use client";
import { OutlineButton } from "@/components/Button";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarPrimaryButton,
  PageNavbarRightContent,
} from "@/components/ui/PageNavbar";
import {
  Add,
  CalendarEdit,
  DirectNotification,
  SearchNormal1,
} from "iconsax-react";
import React, { useEffect, useState } from "react";
import ProfileImage from "@/components/assets/profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import TopNavbar from "@/components/TopNavbar";
import AppLayout from "@/components/layout";
import PageContent from "@/components/ui/PageContent";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/get-products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading ke false setelah fetch selesai
      }
    };

    getProducts();
  }, []);
  const formatToIDR = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };
  console.log(products.length);

  const createProduct = () => {
    router.push("/products/create-product");
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <TopNavbar />
      <PageContent>
        <h4 className="font-bold text-gray-700 mb-4">Products Management</h4>
        <PageNavbarPrimaryButton onClick={createProduct}>
          <Add size={20} />
          <span className="hidden md:inline">Create Product</span>
        </PageNavbarPrimaryButton>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? // Menampilkan skeleton loader ketika data masih loading
              [...Array(4)].map((_, index) => (
                <div key={index} className="rounded-lg border">
                  <div className="h-[330px] w-full bg-gray-200 animate-pulse"></div>
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))
            : products.map((product: any) => (
                <div key={product._id} className="rounded-lg border">
                  <div className="flex flex-col h-full">
                    <Carousel>
                      <CarouselContent>
                        {product.images.map((image: any, index: number) => (
                          <CarouselItem key={index} className="h-[330px] md:h-[230px]">
                            <img
                              src={image.url}
                              alt=""
                              className="w-full h-full object-fit rounded-lg"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="ml-16" />
                      <CarouselNext className="mr-16" />
                    </Carousel>
                    <div className="p-4 flex flex-col gap-2">
                      <h1 className="font-semibold line-clamp-1">
                        {product.productName}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {product.productCategory} - {product.productSize}
                      </p>
                      <div className="inline-flex mb-4">
                        <h3 className="bg-primary/10 rounded-md px-2 py-1 text-sm font-semibold text-primary">
                          {formatToIDR(product.productPrice)}
                        </h3>
                      </div>
                      <OutlineButton
                        onClick={() => router.push(`/products/${product._id}`)}
                        className="w-full"
                      >
                        View Details
                      </OutlineButton>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="border rounded-lg shadow-md p-4">
                  <Skeleton className="rounded-md mb-4 w-full h-40" />
                  <Skeleton className="rounded-md mb-2 h-6 w-3/4" />
                  <Skeleton className="rounded-md mb-4 h-4 w-1/2" />
                  <Skeleton className="rounded-md h-4 w-full" />
                </div>
              ))
            : products.map((product: any) => (
                <div className="rounded-lg">
                  <Carousel className="w-full mx-auto">
                    <CarouselContent>
                      {product.images.map((image: any, index: number) => (
                        <CarouselItem key={index}>
                          <div className="relative h-[350px]">
                            <Image
                              src={image.url}
                              alt="Product Image"
                              fill
                              className=" w-full h-full rounded-lg"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-16" />
                    <CarouselNext className="mr-16" />
                  </Carousel>
                  <div className="flex flex-col mt-2 gap-2">
                    <h1 className="font-semibold text-xl line-clamp-1">
                      {product.productName}
                    </h1>

                    <div className="inline-flex">
                      <h3 className="bg-primary/10 rounded-md px-2 py-1 text-sm font-semibold text-primary">
                        {formatToIDR(product.productPrice)}
                      </h3>
                    </div>
                  </div>
                </div>
                // <div key={product._id} className="border rounded-lg shadow-md p-4">
                //   <img src={product.images[0].url} alt="" className="rounded-md w-full object-cover" />
                //   <h5 className="font-semibold text-lg mb-2">{product.productName}</h5>
                //   <p className="text-gray-700 mb-4">{formatToIDR(product.productPrice)}</p>
                //   <p className="text-gray-500 mb-4">{product.productDescription}</p>
                //   <OutlineButton
                //     onClick={() => router.push(`/products/${product._id}`)}
                //     className="w-full"
                //   >
                //     View Details
                //   </OutlineButton>
                // </div>
              ))}
        </div> */}
      </PageContent>
    </div>
  );
};

export default ProductsPage;
