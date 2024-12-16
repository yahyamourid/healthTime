import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png';
import soignant from '../../assets/soignant.png'
import patient from '../../assets/patient.png'
import admin from '../../assets/admin.png'
import { MdLogout } from "react-icons/md";


const Navbar = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const handleLougout = () => {
        localStorage.removeItem('userData');
        window.location = '/';
    }
    return (
        <div className='flex w-full items-center justify-between px-10 py-4 bg-white text-sm'>
            <a href='/' className='flex items-center gap-1  text-cadetGray font-extrabold tracking-wide text-2xl'>
                <img src={logo} className='w-6 h-6' />
                <p className='text-sky-700 italic'><span className='text-sky-300'>Health</span>Time</p>
            </a>
            <div className="flex gap-10 text-gray-400 items-center">
                <a href="/#home" className='hover:text-sky-900'>Accueil</a>
                <a href="/#services" className='hover:text-sky-900'>Services</a>
                <a href="/#commentçamarche" className='hover:text-sky-900'>Comment ça marche</a>
                <a href="/#contact" className='hover:text-sky-900'>Contact</a>
            </div>
            {storedUserData ?
                <div className="flex items-center gap-2">
                    <a href={`/${storedUserData.role.toLowerCase()}/dashboard`}>
                        <img
                            src={
                                {
                                    'ADMIN': admin,
                                    'SOIGNANT': soignant,
                                    'PATIENT': patient
                                }[storedUserData.role]
                            }
                            className='h-8 w-8'
                        />
                    </a>
                    <div className="flex flex-col">
                        <p className='text-xs font-semibold text-sky-900'>{storedUserData.prenom + " " + storedUserData.nom}</p>
                        <p className='text-xs lowercase text-gray-500'>{storedUserData.role}</p>
                    </div>
                    <button onClick={handleLougout} className='text-gray-500 hover:text-gray-900 hover:scale-105 duration-200'>
                        <MdLogout size={18}/>
                    </button>
                </div>
                :
                <div className="flex gap-5 items-center">
                    <a href="/login" className='text-sky-700 hover:text-sky-600 duration-200'>Se connecter</a>
                    <a href="/register" className='text-white bg-sky-700 px-3 py-1 rounded-md hover:bg-sky-600 duration-200'>S'inscrire</a>
                </div>
            }

        </div>
    )
}

export default Navbar
