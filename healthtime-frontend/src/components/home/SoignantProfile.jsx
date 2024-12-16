import React, { useEffect, useState } from 'react';
import doctor from '../../assets/soignant.png'
import { FaCalendarCheck, FaUserDoctor, FaCircleInfo, FaCashRegister } from "react-icons/fa6";
import LocationMap from './LocationMap';
import AppointmentComponent from './AppointmentComponent';
import NotConnectdModal from './NotConnectdModal';
const SoignantProfile = ({ soignant }) => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showApp, setShowApp] = useState(false)

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleAppoinmentClick = () => {
        setIsModalOpen(true);
    }

    useEffect(() => {
        if (storedUserData){
            if (storedUserData.role === 'PATIENT')
                setShowApp(true)
        }
    },[])

    return (
        <div className="flex flex-col bg-sky-100 w-full z-20">
            {/* image , info */}
            <div className="flex items-center justify-between w-full bg-sky-700 px-10 py-4">
                <div className="flex gap-5 items-center">
                    <img src={doctor} alt="" className='w-24 h-24' />
                    <span className='flex flex-col justify-start text-white gap-2'>
                        <p className='text-xl font-semibold'>Dr {soignant.prenom + " " + soignant.nom}</p>
                        <span className='flex items-center gap-2'>
                            {soignant.specialites.map((specialite) => (
                                <p className='text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded text-sm' >{specialite.nom} </p>
                            ))}
                        </span>
                    </span>
                </div>
                <button className={` items-center justify-center px-3 py-4 bg-white text-sky-700 gap-2 text-s font-semibold rounded-lg hover:scale-105 duration-300 flex ${!(!storedUserData || showApp) && 'hidden'}`}
                    onClick={handleAppoinmentClick}>
                    <FaCalendarCheck />
                    <p>Prendre un rendez-vous</p>

                </button>
            </div>

            <div className="flex w-full h-5/6 p-5 gap-6">
                <div className="flex flex-col h-full w-1/2 tracking-wide gap-5 max-h-80 overflow-y-auto rounded-b-md px-4 py-2 scrollbar scrollbar-thumb-sky-700 scrollbar-track-transparent">
                    {/* presentation section */}
                    <div className="flex flex-col w-full bg-white px-8 py-4 gap-1 rounded-md">
                        <span className=' flex items-center text-sm text-sky-700 font-semibold gap-2 pb-1 w-full border-b border-b-zinc-500/70'>
                            <FaUserDoctor />
                            <p>Presentation</p>
                        </span>
                        {soignant.presentation ?
                            <p className='text-xs text-zinc-600'>{soignant.presentation}</p>
                            :
                            <p>Pas de presentation</p>}
                    </div>

                    {/* Information section */}
                    <div className="flex flex-col w-full bg-white px-8 py-4 gap-1 rounded-md">
                        <span className=' flex items-center text-sm text-sky-700 font-semibold gap-2 pb-1 w-full border-b border-b-zinc-500/70'>
                            <FaCircleInfo />
                            <p>Information</p>
                        </span>
                        <div className="flex flex-col items-start text-zinc-600">
                            <span className='flex items-center gap-1 text-xs'>
                                <p className='font-semibold'>Email : </p>
                                <p>{soignant.email}</p>
                            </span>
                            <span className='flex items-center gap-1 text-xs'>
                                <p className='font-semibold'>Telephone : </p>
                                <p>{soignant.telephone}</p>
                            </span>
                            <span className='flex items-center gap-1 text-xs'>
                                <p className='font-semibold'>Adresse : </p>
                                <p>{soignant.adresse}</p>
                            </span>
                        </div>
                    </div>

                    {/* tarification */}
                    <div className="flex flex-col w-full bg-white px-8 py-4 gap-1 rounded-sm">
                        <span className=' flex items-center text-sm text-sky-700 font-semibold gap-2 pb-1 w-full border-b border-b-zinc-500/70'>
                            <FaCashRegister />
                            <p>Tarification</p>
                        </span>
                        <span className='flex justify-between items-center text-xs '>
                            <p>Consultation</p>
                            <p className='text-sky-700 font-semibold'>{soignant.tarif} DH</p>
                        </span>
                    </div>

                    {/* Diplome section */}
                    <div className="flex flex-col w-full bg-white px-8 py-4 gap-1 rounded-md">
                        <span className=' flex items-center text-sm text-sky-700 font-semibold gap-2 pb-1 w-full border-b border-b-zinc-500/70'>
                            <FaUserDoctor />
                            <p>Diplomee</p>
                        </span>
                        {soignant.diplomes.length > 0 ?
                            <p className='text-xs text-zinc-600'>{soignant.nom}</p>
                            :
                            <p className='text-xs'>Pas de diplomes</p>}
                    </div>

                    {/* Experiences section */}
                    <div className="flex flex-col w-full bg-white px-8 py-4 gap-1 rounded-md">
                        <span className=' flex items-center text-sm text-sky-700 font-semibold gap-2 pb-1 w-full border-b border-b-zinc-500/70'>
                            <FaUserDoctor />
                            <p>Expériences</p>
                        </span>
                        {soignant.experiences.length > 0 ?
                            <p className='text-xs text-zinc-600'>{soignant.presentation}</p>
                            :
                            <p className='text-xs'>Pas d'expérience</p>}
                    </div>


                </div>
                <LocationMap latitude={soignant.latitude} longitude={soignant.longitude} />
            </div>
            {isModalOpen && (
                showApp ?
                    <AppointmentComponent soignantId={soignant.id} onClose={handleCloseModal} open={true}/>
                    :
                    <NotConnectdModal close={handleCloseModal} />
            )}
        </div>
    );
};

export default SoignantProfile;
