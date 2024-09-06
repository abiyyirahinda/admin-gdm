"use client"

import Image from 'next/image'
import { AddCircle, ArrowRight2, Book, Box, Calendar, Category, Document, Element3, Folder2, Headphone, Logout, MouseSquare, Profile2User, Setting2, Setting4, Star, Timer1, Triangle } from 'iconsax-react'
import ProfileImage from '@/components/assets/profile.png'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { useCentralStore } from '@/Store'
import React, { useEffect } from 'react'
import { signOut } from 'next-auth/react'


function Sidebar() {

    const pathname = usePathname()
    const { setIsSidebarOpen, isSidebarOpen } = useCentralStore()

    // useEffect(() => {
    //     if (!isSidebarOpen) setIsSidebarOpen(!isSidebarOpen)
    // }, [pathname])

    return (
        <div className='w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden'>
            <div className='w-full h-full bg-white border-r'>
                {/* logo */}
                <div className='p-4 md:p-6 flex cursor-pointer group items-center gap-2'>
                    <div className='h-10 outline  w-10 flex items-center  justify-center rounded-full from-violet-500 to-violet-400 text-white'>
                        {/* <Triangle size={24} className='relative group-hover:scale-75 duration-200' /> */}
                        <img src='https://garam2musim.com/wp-content/uploads/2022/06/Picture1.png' alt="User" width={40} height={40} className="rounded-full" />
                        
                    </div>
                    <div>
                        <h1 className='text-sm font-bold text-gray-800'>Garam Dua Musim</h1>
                        <p className='text-xs text-gray-500 font-medium'>Store Management</p>
                    </div>
                </div>

                {/* section divider */}
                <hr className='bg-gray-400 mx-2' />

                {/* other section */}
                <div className='flex flex-col h-full justify-between'>
                    {/* top */}
                    <div className='pt-6 text-gray-500 font-medium space-y-2 md:px-2 text-xs'>
                        <Link href={'/dashboard'} className={`flex ${pathname === '/dashboard' ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
                            <Element3 variant='Outline' size={16} />
                            Dashboard
                        </Link>

                        <Link href={'/billboard'} className={`flex ${pathname === '/billboard' || (pathname.startsWith('/billboard/')) ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
                            <MouseSquare size={16} />
                            Billboard
                        </Link>
                        <Link href={'/category'} className={`flex ${pathname === '/category' ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
                            <Category size={16} />
                            Category
                        </Link>
                        <Link href={'/products'} className={`flex ${pathname === '/products' || (pathname.startsWith('/products/') && pathname !== '/products/create-product') ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
                            <Box size={16} />
                            Products
                        </Link>

                        <Link href={'/products/create-product'} className={`flex ${pathname === '/products/create-product' ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
                            <AddCircle size={16} />
                            Create new product
                        </Link>
                        <Link href={'/order'} className={`flex ${pathname === '/order' ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
                            <Book size={16} />
                            Order
                        </Link>

                        {/* <button disabled className={`flex ${pathname === '/app/calendar' ? 'text-primary' : ''} hover:px-8 disabled:opacity-60 duration-200 px-6 py-2 items-center gap-2`}>
                            <Calendar size={16} />
                            Calendar
                        </button>

                        <button disabled className={`flex ${pathname === '/app/timeoff' ? 'text-primary' : ''} hover:px-8 disabled:opacity-60 duration-200 px-6 py-2 items-center gap-2`}>
                            <Timer1 size={16} />
                            Time Off
                        </button>

                        <button disabled className={`flex ${pathname === '/app/projects' ? 'text-primary' : ''} hover:px-8 disabled:opacity-60 duration-200 px-6 py-2 items-center gap-2`}>
                            <Folder2 size={16} />
                            Projects
                        </button>

                        <button disabled className={`flex ${pathname === '/app/benefits' ? 'text-primary' : ''} hover:px-8 disabled:opacity-60 duration-200 px-6 py-2 items-center gap-2`}>
                            <Star size={16} />
                            Benefits
                        </button>

                        <button disabled className={`flex ${pathname === '/app/documents' ? 'text-primary' : ''} hover:px-8 disabled:opacity-60 duration-200 px-6 py-2 items-center gap-2`}>
                            <Document size={16} />
                            Documents
                        </button> */}
                    </div>

                    <div>
                        <div className='text-gray-500 text-xs font-medium md:px-2'>
                            <button className={`flex ${pathname === '/app/settings' ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
                                <Setting2 size={16} />
                                Settings
                            </button>

                            <button onClick={() => signOut()} className='flex hover:px-8 duration-200 px-6 py-2 items-center gap-2'>
                                <Logout size={16} />
                                Sign Out
                            </button>
                        </div>

                        <hr className='bg-gray-400 mx-2 my-4' />

                        {/* bottom */}
                        <div className='flex pb-28 justify-between px-4 md:px-6 items-center cursor-pointer hover:pr-5 duration-200'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={ProfileImage}
                                    alt='User'
                                    width={36}
                                    height={36}
                                    className='rounded-full'
                                />
                                <div className=''>
                                    <p className='text-sm font-semibold text-gray-800'>Steve Jobs</p>
                                    <p className='text-xs font-medium text-gray-500'>steve@apple.com</p>
                                </div>
                            </div>

                            <button className='text-gray-500'>
                                <ArrowRight2 size={16} />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}


const NavbarLink = ({ href, active }: { href: string, active: boolean }) => {
    return (
        <Link
            href={href}

        >

        </Link>
    )
}

const NavLink = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & React.ComponentPropsWithoutRef<'a'>
>((props, ref) => {
  const { className, href, ...rest } = props;

  return (
    <Link
      href={href!}
      ref={ref}
      className={`flex ${window.location.pathname === href ? 'text-primary' : ''} hover:px-8 duration-200 rounded-md w-full py-2 px-6 items-center gap-2 ${className}`}
      {...rest}
    />
  );
});

NavLink.displayName = 'NavLink';



export default Sidebar