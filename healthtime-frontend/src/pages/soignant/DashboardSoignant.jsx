import React from 'react'
import SideBarSoignant from '../../components/soignant/SideBarSoignant'
import DashboardElement from '../../components/soignant/DashboardElement'
const DashboardSoignant = () => {
  return (
    <div className='flex items-start justify-center bg-gray-50 w-full min-h-screen font-[Lato]'>
      <SideBarSoignant />
      <div className=' flex items-center justify-center ml-1/6 w-full'>
        <DashboardElement />
      </div>
    </div>
  )
}

export default DashboardSoignant
