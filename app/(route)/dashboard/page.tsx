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
    return <div>Loading...</div>
  }

  return (
    <div>
        <DashboardComp />
    </div>
  )
}

export default DashboardPage
