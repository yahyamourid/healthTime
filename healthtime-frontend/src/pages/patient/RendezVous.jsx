import React from 'react'
import SideBarPatient from '../../components/patient/SideBarPatient'
import RendezVousList from '../../components/patient/RendezVousList'
const RendezVous = () => {
  return (
    <div className='flex items-start justify-center bg-gray-50 w-full min-h-screen font-[Lato]'>
      <SideBarPatient />
      <div className=' flex items-center justify-center ml-1/6 w-full p-5'>
        <RendezVousList />
      </div>
    </div>
  )
}

export default RendezVous
