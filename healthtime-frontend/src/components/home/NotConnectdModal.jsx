import React from 'react'
import { FaUserShield } from "react-icons/fa6";

const NotConnectdModal = ({ close }) => {
    const handleConnect = () => {
        window.location = '/login';
    }
    return (
        <div className="absolute top-0 left-0 w-full h-full z-50 bg-gray-800  bg-opacity-50 flex items-center justify-center ">
            <div className="flex flex-col text-xs w-1/3 tracking-wide  items-center justify-center gap-3 bg-white p-5 rounded-md shadow-md">
                {/* <p className='text-lg font-semibold'>Attention</p> */}
                <span className='text-sky-500 bg-sky-100 p-5 rounded-full'>
                    <FaUserShield size={40} />
                </span>
                <p>Vous n'êtes pas connecté pour faire cette opération.</p>
                <span className='flex gap-4 mt-4'>
                    <button className='text-white bg-sky-500 px-4 py-1.5 rounded-sm hover:bg-sky-600 duration-200'
                        onClick={handleConnect}>
                        Se connecter
                    </button>
                    <button className='text-sky-600 hover:text-sky-500 duration-200'
                        onClick={close}>
                        Fermer
                    </button>
                </span>
            </div>
        </div>
    )
}

export default NotConnectdModal
