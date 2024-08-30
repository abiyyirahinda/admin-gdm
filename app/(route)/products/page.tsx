"use client";
import { OutlineButton } from '@/components/ui/Button'
import PageNavbar, { PageNavbarIconButton, PageNavbarLeftContent, PageNavbarPrimaryButton, PageNavbarRightContent } from '@/components/ui/PageNavbar'
import { Add, CalendarEdit, DirectNotification, SearchNormal1 } from 'iconsax-react'
import React from 'react'
import ProfileImage from '@/components/assets/profile.png'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import TopNavbar from '@/components/TopNavbar';
import AppLayout from '@/components/layout';
import PageContent from '@/components/ui/PageContent';
import { useRouter } from 'next/navigation';

const ProductsPage = () => {
  const router = useRouter()
  const createProduct = () => {
    router.push('/products/create-product')
  }
  return (

    <div className='min-h-screen bg-white text-black'>
        <TopNavbar />
        <PageContent>
          {/* <div className="border p-2 rounded-2xl">
              <h1 className='font-bold '>Products List</h1>
          </div> */}
          <PageNavbarPrimaryButton onClick={createProduct}>
            <Add size={20} />
            <span className='hidden md:inline'>Create Product</span>
          </PageNavbarPrimaryButton>
        </PageContent>
    </div>
  )
}

export default ProductsPage