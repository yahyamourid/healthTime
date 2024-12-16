import React from 'react'
import hero from '../../assets/hero.png'
import doctor from '../../assets/doctor.jpg'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
const Hero = () => {
    return (
        <div id='home' className='flex flex-col  w-full min-h-screen h-screen bg-sky-100'>
            <Navbar />
            <div className="relative flex items-center justify-center h-full">
                <div className="flex flex-col pt-20 w-3/5 h-full p-10 tracking-wide gap-2.5">
                    <p className='text-base text-sky-500'>
                        Bienvenue sur HealthTime
                    </p>
                    <p className='text-4xl text-sky-900 font-extrabold'>
                        Trouvez et réservez un rendez-vous médical en quelques clics !
                    </p>
                    <p className='text-base  text-gray-500'>
                        Accédez aux meilleurs docteurs près de chez vous, gérez vos rendez-vous et vos consultations facilement
                    </p>
                </div>
                <div className="relative w-2/5 ">
                    <img src={hero} />
                    <div className="absolute bottom-48 flex flex-col justify-center items-center w-3/5 bg-white/50 backdrop-blur-md tracking-wide p-3 rounded-md">
                        <div className="flex w-full items-center gap-2">
                            <img src={doctor} alt="docteur" className="rounded-full w-12 h-12" />
                            <div className="w-full">
                                <p className="text-sky-900 text-sm font-semibold">Dr. Amine ALOUI</p>
                                <p className="text-gray-500 text-xs">Cardiologe</p>
                            </div>
                        </div>
                        <p className="text-xs bg-sky-700/10 px-5 py-1 rounded text-sky-700">Lundi, 15 Mai, 10:15 - 10:30</p>
                    </div>

                </div>
                <SearchBar mode={"home"}/>
            </div>
        </div>
    )
}

export default Hero
