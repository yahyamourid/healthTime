import React from 'react'
import SideBarSoignant from '../../components/soignant/SideBarSoignant'
import PatientsTable from '../../components/soignant/PatientsTable'
const PatientsList = () => {
  return (
    <div className='flex items-start justify-center bg-sky-50 w-full min-h-screen font-[Lato]'>
      <SideBarSoignant />
      <div className=' flex items-center justify-center ml-1/6 w-full'>
        <PatientsTable />
      </div>
    </div>
  )
}

export default PatientsList
