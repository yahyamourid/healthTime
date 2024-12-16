import React from 'react'
import doctor from '../../assets/soignant.png'
import { FaMapLocationDot } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import SearchBar from './SearchBar'
const SoignantsBySpecilite = ({ soignants, specialiteId, villeId }) => {

    const handleSoignantClick = (id) => {
        window.location = `/search/soignants/${id}`;
    }
    return (
        <div className="flex flex-col items-center w-full justify-center py-5 gap-5">
            <SearchBar specialiteId={specialiteId} villeId={villeId} />
            {soignants.length > 0 ?
                <div className='grid grid-cols-3 w-5/6 gap-5'>
                    {soignants.map(soignant => (
                        <div key={soignant.id} className='flex items-center bg-white p-4 rounded-md gap-3 hover:bg-gray-700/5 duration-200 hover:cursor-pointer'
                            onClick={() => handleSoignantClick(soignant.id)}>
                            <img src={doctor} alt="" className='w-14 h-14' />
                            <span className='flex flex-col text-xs tracking-wide gap-0.5'>
                                <p className='text-sm font-semibold text-sky-900'>{soignant.prenom + " " + soignant.nom}</p>
                                <span className='flex items-center text-zinc-600 gap-1'>
                                    <FaMapLocationDot size={16} />
                                    <p>{soignant.adresse + " , " + soignant.nomVille}</p>
                                </span>
                                <span className='flex items-center text-zinc-600 gap-1'>
                                    <FaPhoneVolume size={16} />
                                    <p>{soignant.telephone}</p>
                                </span>
                                <span className='flex items-center text-zinc-600 gap-1'>
                                    <GiMoneyStack size={16} />
                                    <p>{soignant.tarif} dh</p>
                                </span>
                            </span>
                        </div>
                    ))}
                </div> :
                <div className="flex items-center gap-1 w-full py-28 justify-center text-zinc-600 text-sm">
                    <FaMapLocationDot size={16} />
                    <p>Pas de soignants à afficher pour cette spécialité ou cette ville</p>
                </div>}
        </div>
    )
}

export default SoignantsBySpecilite
