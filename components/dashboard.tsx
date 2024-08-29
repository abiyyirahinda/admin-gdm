import React from 'react'
import { signOut } from 'next-auth/react'

const DashboardComp = () => {

  return (
    <div className='text-center '>
      <div>Dashboard</div>
        <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}

export default DashboardComp