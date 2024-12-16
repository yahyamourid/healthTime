import React from 'react'
import { FaCheck } from "react-icons/fa";

const SuccessModal = ({message}) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800  bg-opacity-50 flex items-center justify-center ">
            <div className="flex flex-col w-1/3 h-1/3 gap-2 justify-center items-center bg-white px-10 py-5 rounded-lg shadow-lg">
                <div className="text-green-500 bg-green-100 p-5 rounded-full">
                    <FaCheck size={38}/>
                </div>
                <p className='text-sm font-bold tracking-wide '>Succès</p>
                <p className='text-xs text-center text-gray-500'>{message}</p>
            </div>
        </div>
    )
}

export default SuccessModal
