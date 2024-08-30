"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const LoginForm = () => {
  const {data: session, status} = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  })
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="https://garam2musim.com/wp-content/uploads/2022/06/Picture1.png" alt="loading" className='animate-breathing' />
      </div>
    )
  } 

  if (status === 'unauthenticated') {
    router.push('/dashboard')
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src="https://garam2musim.com/wp-content/uploads/2022/06/Picture1.png" alt="loading" className='animate-breathing' />
    </div>
  )
    // <div className="flex flex-col items-center justify-center min-h-screen">
    //   <div className="flex flex-col items-center justify-center w-full">
    //     Welcome!
    //   </div>
    // </div>
  
};

export default LoginForm;
