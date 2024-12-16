import React from 'react'
import SideBarAdmin from '../../components/admin/SideBarAdmin'
import DemandsList from '../../components/admin/DemandsList'
import { FaUserDoctor, FaListCheck, FaChartColumn } from "react-icons/fa6";
const Demandes = () => {
  return (
    <div className='flex items-start justify-center bg-whiteSmoke w-full min-h-screen font-[Lato]'>
      <SideBarAdmin />
      <div className="flex ml-1/6 flex-col items-start justify-center w-2/3 mt-10 ">
        <div className="flex items-center gap-2 ">
          <FaListCheck size={18} className=''/>
          <p className='text-lg font-semibold '>Liste des demmandes</p>
        </div>
        <DemandsList />
      </div>
    </div>
  )
}

export default Demandes
