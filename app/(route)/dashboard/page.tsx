'use client'
import DashboardComp from '@/components/dashboard'
import Providers from '@/components/providers'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const DashboardPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  console.log(session)
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn()
    }
  }, [status])
  
  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="https://garam2musim.com/wp-content/uploads/2022/06/Picture1.png" alt="loading" className='animate-breathing' />
      </div>
    )
  }

  return (
    <div>
        <DashboardComp />
    </div>
  )
}

export default DashboardPage
