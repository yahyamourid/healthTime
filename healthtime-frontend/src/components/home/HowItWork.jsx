import React from 'react'
import { FaUserDoctor } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiFeedbackFill } from "react-icons/ri";

const HowItWork = () => {
    return (
        <div id='commentçamarche' className='flex flex-col  items-center  w-full min-h-screen h-screen tracking-wide bg-gray-50'>
            <p className='text-3xl font-bold text-sky-900 py-20'>Comment ça marche?</p>
            <div className="flex items-center w-full px-10 gap-5">

                <div className="flex flex-col items-center w-1/4 text-center p-4 bg-white shadow-sm rounded-lg border border-gray-400/20 gap hover:border-sky-500 duration-300 hover:cursor-pointer hover:scale-105">
                    <span className='bg-sky-400/40 p-4 rounded-full text-sky-500 mb-2'>
                        <FaUserDoctor size={30} />
                    </span>
                    <p className='font-semibold text-sky-900'>Trouvez un docteur</p>
                    <p className='text-sm text-gray-500'>Recherchez un professionnel de santé par spécialité ou localisation.</p>
                </div>

                <div className="flex flex-col items-center w-1/4 text-center p-4 bg-white shadow-sm rounded-lg border border-gray-400/20 gap hover:border-pink-500 duration-300 hover:cursor-pointer hover:scale-105">
                    <span className='bg-pink-400/40 p-4 rounded-full text-pink-500 mb-2'>
                        <FaRegCalendarAlt size={30} />
                    </span>
                    <p className='font-semibold text-sky-900'>Choisissez une date et un horaire</p>
                    <p className='text-sm text-gray-500'>Consultez les créneaux disponibles et réservez en ligne.</p>
                </div>

                <div className="flex flex-col items-center w-1/4 text-center p-4 bg-white shadow-sm rounded-lg border border-gray-400/20 gap hover:border-green-500 duration-300 hover:cursor-pointer hover:scale-105">
                    <span className='bg-green-400/40 p-4 rounded-full text-green-500 mb-2'>
                        <IoNotificationsSharp size={30} />
                    </span>
                    <p className='font-semibold text-sky-900'>Recevez des rappels</p>
                    <p className='text-sm text-gray-500'> Notification par e-mail avant chaque rendez-vous.</p>
                </div>
                
                <div className="flex flex-col items-center w-1/4 text-center p-4 bg-white shadow-sm rounded-lg border border-gray-400/20 gap hover:border-yellow-500 duration-300 hover:cursor-pointer hover:scale-105">
                    <span className='bg-yellow-400/40 p-4 rounded-full text-yellow-500 mb-2'>
                        <RiFeedbackFill size={30} />
                    </span>
                    <p className='font-semibold text-sky-900'>Consultez et évaluez </p>
                    <p className='text-sm text-gray-500'>Laissez un avis après la consultation pour aider d’autres patients.</p>
                </div>

            </div>
        </div>
    )
}

export default HowItWork
