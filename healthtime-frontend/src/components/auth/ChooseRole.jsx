import React from 'react'

import patient from '../../assets/patient.png';
import soignant from '../../assets/soignant.png';

const ChooseRole = ({mode,handleModeChange}) => {
  return (
    <div className="relative flex flex-col items-center  w-1/3 h-full bg-white rounded-md px-5 shadow-sm">
                    {/* <a href='/' className='absolute top-0 flex items-center gap-1 p-3 z-50 text-cadetGray font-extrabold tracking-wide text-2xl w-full '>
                        <img src={logo} className='w-6 h-6' />
                        <p className='text-sky-700 italic'><span className='text-sky-300'>Health</span>Time</p>
                    </a> */}
                    <p className='text-2xl font-extrabold  tracking-wide text-sky-700 w-full mt-12 text-center'>Inscrivez-vous</p>
                    <p className='text-sm w-full text-gray-400 mt-1 mb-8 text-center'>Veuillez choisir votre rôle Rejoignez notre communauté</p>

                    <div className={`flex w-full py-2 px-4 gap-3 tracking-wide mt-5 rounded-lg cursor-pointer border ${mode == "soignant" ? 'bg-sky-200/30 border-sky-300':'bg-white border-white'}`}
                        onClick={() => handleModeChange("soignant")}
                    >
                        <img src={soignant} alt="soignant" className='w-1/4' />
                        <div className="flex flex-col justify-center items-start gap-0.5">
                            <p className='text-sky-700 text-base font-semibold'>Soignant</p>
                            <p className='text-gray-400'>Offrir des soins de qualité et faciliter la gestion de vos rendez-vous avec vos patients</p>
                        </div>
                    </div>
                    <div className={`flex w-full py-2 px-4 gap-3 tracking-wide mt-5 rounded-lg cursor-pointer border ${mode == "patient" ? 'bg-green-200/50 border-green-300':'bg-white border-white'}`}
                        onClick={() => handleModeChange("patient")}
                    >
                        <img src={patient} alt="soignant" className='w-1/4' />
                        <div className="flex flex-col justify-center items-start gap-0.5">
                            <p className='text-sky-700 text-base font-semibold'>Patient</p>
                            <p className='text-gray-400'>Accéder facilement à vos rendez-vous et bénéficier d’un suivi médical personnalisé</p>
                        </div>
                    </div>
                    <div className="absolute bottom-12 text-center flex flex-col gap-1">
                    <p className=' text-xs text-gray-500 text-center'>Vous avez un compte ? <a href='/login' className='text-sky-700 font-bold'>s'authentifier</a></p>
                        <a href="/" className='text-sky-700 underline'>Home</a>
                    </div>
                   
                </div>
  )
}

export default ChooseRole
