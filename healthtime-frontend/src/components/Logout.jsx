import React from 'react'
import user from '../assets/user.png'
import { FiLogOut } from "react-icons/fi";

const Logout = () => {
    const handleLougout = () => {
        localStorage.removeItem('userData');
        window.location = '/login';
    }
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    return (
        <div className='fixed bottom-2 flex flex-col items-center justify-center bg-whiteSmoke gap-0.5 px-4 py-2 border-l-burntSienna border-l-2 rounded-r'>
            <img src={user} className='w-10' />
            <div className="flex gap-1">
                <p className='text-xs first-letter:uppercase text-gray-700 font-semibold'>{storedUserData.prenom}</p>
                <p className='text-xs first-letter:uppercase text-gray-700 font-semibold'>{storedUserData.nom}</p>
            </div>
            <p className='text-xs  text-gray-500'>{storedUserData.email}</p>
            <button className="flex gap-1 items-center text-xs text-burntSienna bg-orange-500/20 mt-2 px-2 py-1 rounded hover:bg-orange-500/30 duration-300"
                onClick={handleLougout}>
                <FiLogOut size={16}/>
                <p>Déconnection</p>
            </button>
        </div>
    )
}

export default Logout
