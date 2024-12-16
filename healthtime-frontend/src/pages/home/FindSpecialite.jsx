import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/home/Navbar';
import SoignantsBySpecilite from '../../components/home/SoignantsBySpecilite';


const FindSpecialite = () => {
    const back = import.meta.env.VITE_BACK_URL
    const [soignants, setSoignants] = useState([]);
    const { specialiteId } = useParams();
    const { villeId } = useParams();

    useEffect(() => {
        const fetchSoignants = async () => {
            try {
                const response = await axios.get(`${back}/soignants/soignantsBySpecialite/${specialiteId}/${villeId}`);
                setSoignants(response.data);

            } catch (error) {
                console.error('Erreur lors de la récupération du soignant:', error);
            }
        };

        fetchSoignants();
    }, [specialiteId, villeId]);

    return (
        <div className='flex flex-col items-center font-[Lato] w-full bg-sky-100 min-h-screen h-screen'>
            <Navbar />
            <SoignantsBySpecilite soignants={soignants} specialiteId={specialiteId} villeId={villeId}/>
        </div>
    )
}

export default FindSpecialite
