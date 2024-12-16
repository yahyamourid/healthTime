import React from 'react'
import CalendarComponent from '../../components/soignant/CalendarComponent'
import SideBarSoignant from '../../components/soignant/SideBarSoignant'
const CalendarRendezVous = () => {
    return (
        <div className='flex flex-row min-h-screen max-h-screen h-screen bg-sky-100 font-[Lato]'>
            <SideBarSoignant />
            
            <div className=' flex items-center justify-center ml-1/6 w-full'>
                <CalendarComponent />
            </div>
        </div>
    )
}

export default CalendarRendezVous