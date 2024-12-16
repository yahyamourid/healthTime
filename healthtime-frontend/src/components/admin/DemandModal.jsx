import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { MdAlternateEmail, MdPhoneInTalk, MdLocationOn } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import axios from 'axios';

const DemandModal = ({ demande, close }) => {
    const back = import.meta.env.VITE_BACK_URL
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${back}/soignants/certificat/${demande.id}`);
                setImageSrc(`data:image/png;base64,${response.data.image}`);

            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();
    }, [demande.id]);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-dimGray bg-opacity-20 backdrop-blur-sm">
            <div className='relative flex bg-white w-5/6 h-5/6 rounded-md'>
                <button onClick={close} className='absolute top-2 right-2 text-sky-900'>
                    <IoMdClose />
                </button>
                <div className="w-full h-full flex items-end justify-center p-4 rounded-md">
                    {imageSrc ? (
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage: `url(${imageSrc})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}
                        >
                            <p className='text-xs text-sky-900 font-semibold'>Certificat de travail</p>
                        </div>
                    ) : (
                        <p className='text-zinc-500 text-sm'>Chargement de l'image...</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DemandModal;
