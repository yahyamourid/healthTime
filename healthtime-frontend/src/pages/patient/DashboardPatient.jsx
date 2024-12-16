import React from 'react'
import SideBarPatient from '../../components/patient/SideBarPatient'
import DashboardElement from '../../components/patient/DashboardElement'
const DashboardPatient = () => {
  return (
    <div className='flex items-start justify-center bg-gray-50 w-full min-h-screen font-[Lato]'>
      <SideBarPatient />
      <div className=' flex items-center justify-center ml-1/6 w-full'>
        <DashboardElement />
      </div>
    </div>
  )
}

export default DashboardPatient
