import React from 'react'
import { IoWarningOutline } from "react-icons/io5";

const ConfirmModal = ({id, operation, message, action, close}) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800  bg-opacity-50 flex items-center justify-center ">
            <div className="flex flex-col text-xs  items-center justify-center bg-white p-5 rounded-md shadow-md">
                <p className='text-lg font-semibold text-gray-700'>Confirmation de {operation}</p>
                <IoWarningOutline className='text-burntSienna my-3' size={60}/>
                <p className='text-gray-500 mb-2'>Êtes-vous sûr de vouloir  {message} ?</p>
                <div className="flex justify-end gap-2 mt-4">

                    <button
                        className=" text-burntSienna py-1 px-3 rounded hover:text-burntSienna/90 duration-300"
                        onClick={close}
                    >
                        Non
                    </button>
                    <button
                        className="bg-burntSienna/90 text-white py-1 px-3 rounded hover:bg-burntSienna duration-300"
                        onClick={() => action(id)}
                    >
                        Oui
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ConfirmModal
