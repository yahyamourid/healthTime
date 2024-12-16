import React from 'react';
import { FaStethoscope, FaClock, FaGlobe } from 'react-icons/fa'; // Icônes d'exemple
import service1 from '../../assets/service1.png'
import service2 from '../../assets/service2.png'
import service3 from '../../assets/service3.png'
import service4 from '../../assets/service4.png'
const Services = () => {
    return (
        <div id='services' className='flex flex-col  items-center  w-full min-h-screen h-screen tracking-wide bg-sky-500'>
            <p className='text-3xl font-bold  pt-5 text-white'>Services</p>
            <div className="flex w-full h-full px-20 items-center gap-10">
                <div className="flex flex-col grid-cols-2 w-2/5 h-full justify-center items-center">
                    <div className="flex w-full h-1/2 justify-center items-center gap-3">
                        <div className="flex w-52 h-52 bg-white rounded-xl hover:scale-95 duration-300" style={{ backgroundImage: `url(${service1})`, backgroundSize: 'cover' }}></div>
                        <div className="flex w-52 h-52 bg-white rounded-xl hover:scale-95 duration-300" style={{ backgroundImage: `url(${service2})`, backgroundSize: 'cover' }}></div>
                    </div>
                    <div className="flex w-full h-1/2 justify-center items-center gap-3 -mt-10">
                        <div className="flex w-52 h-52 bg-white rounded-xl hover:scale-95 duration-300" style={{ backgroundImage: `url(${service3})`, backgroundSize: 'cover' }}></div>
                        <div className="flex w-52 h-52 bg-white rounded-xl hover:scale-95 duration-300" style={{ backgroundImage: `url(${service4})`, backgroundSize: 'cover' }}></div>
                    </div>

                </div>
                <div className="flex flex-col w-3/2 gap-3">
                    {/* Service 1 */}
                    <div className="flex items-center  bg-sky-50 rounded-lg p-5 shadow-md gap-3 ">
                        <div className="bg-sky-200 p-3 rounded-full mb-4">
                            <FaStethoscope className="text-sky-500 text-2xl" />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-sky-900">Conseils de Santé, à tout moment</p>
                            <p className="text-gray-520 text-sm">
                                Recevez des conseils de santé d'experts à votre convenance avec des consultations en ligne avec les meilleurs docteurs.
                            </p>
                        </div>
                    </div>

                    {/* Service 2 */}
                    <div className="flex items-center  bg-sky-50 rounded-lg p-5 shadow-md gap-3 ml-20">
                        <div className="bg-sky-200 p-3 rounded-full mb-4">
                            <FaClock className="text-sky-500 text-2xl" />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-sky-900">Solutions de Santé Efficaces</p>
                            <p className="text-gray-520 text-sm">
                            Simplifiez votre expérience de santé avec des consultations en ligne, réduisant les temps d'attente et les tâches administratives.
                            </p>
                        </div>
                    </div>

                    {/* Service 3 */}
                    <div className="flex items-center  bg-sky-50 rounded-lg p-5 shadow-md gap-3 ml-40">
                        <div className="bg-sky-200 p-3 rounded-full mb-4">
                            <FaGlobe className="text-sky-500 text-2xl" />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-sky-900">Expertise Globale, Accès Local</p>
                            <p className="text-gray-520 text-sm">
                            Brisez les barrières géographiques et accédez à des soins spécialisés où que vous soyez.
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Services;
