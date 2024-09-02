"use client";
import { OutlineButton } from "@/components/Button";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarPrimaryButton,
  PageNavbarRightContent,
} from "@/components/ui/PageNavbar";
import { Add, ArrowRight3, CalendarEdit, DirectNotification, SearchNormal1 } from "iconsax-react";
import React, { useEffect, useState } from "react";
import ProfileImage from "@/components/assets/profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import TopNavbar from "@/components/TopNavbar";
import AppLayout from "@/components/layout";
import PageContent from "@/components/ui/PageContent";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [countSkeleton, setCountSkeleton] = useState<number>(10);

  const router = useRouter();
  const ITEMS_PER_PAGE = 10;
  useEffect(() => {
    const getProducts = async (page: number) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/get-products?page=${page}&limit=${ITEMS_PER_PAGE}`);
        const data = await response.json();
        setProducts(data.products);
        setCountSkeleton(data.products.length);
        setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      } catch (error) {
      } finally {
        // setLoading(true); // Set loading ke false setelah fetch selesai
        setLoading(false);
      }
    };

    getProducts(currentPage);
  }, [currentPage]);
  const formatToIDR = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

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
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {loading
            ? // Menampilkan skeleton loader ketika data masih loading
              [...Array(countSkeleton)].map((_, index) => (
                <div key={index} className="rounded-lg border overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 animate-pulse min-h-[200px]"></div>
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse mt-4 w-full"></div>
                  </div>
                </div>
              ))
            : products.map((product: any) => (
                <div key={product._id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md">
                    <img src={product.images[0].url} alt="image" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="mt-4 flex flex-col justify-between">
                    <h1 className="font-semibold line-clamp-1">{product.productName}</h1>
                    <p className="text-sm text-gray-500 line-clamp-1 mb-4">
                      {product.productCategory} - {product.productSize}
                    </p>
                    <div className="inline-flex mb-4">
                      <h3 className="bg-primary/10 rounded-md px-2 py-1 text-sm font-semibold text-primary">
                        {formatToIDR(product.productPrice)}
                      </h3>
                    </div>
                    <PageNavbarPrimaryButton onClick={() => router.push(`/products/${product._id}`)} className="w-full">
                      View Details
                    </PageNavbarPrimaryButton>
                  </div>
                </div>
              ))}
        </div>
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink href="#" onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "text-primary" : ""}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationNext href="#" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </PageContent>
    </div>
  );
};

export default ProductsPage;
