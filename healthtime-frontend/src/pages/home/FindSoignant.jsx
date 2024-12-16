import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/home/Navbar';
import SoignantProfile from '../../components/home/SoignantProfile';

const FindSoignant = () => {
    const back = import.meta.env.VITE_BACK_URL
    const [soignant, setSoignant] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchSoignant = async () => {
            try {
                const response = await axios.get(`${back}/soignants/${id}`);
                setSoignant(response.data); // Mettre à jour l'état avec les données récupérées
            } catch (error) {
                console.error('Erreur lors de la récupération du soignant:', error);
            }
        };

        fetchSoignant();
    }, [id]);

    if (!soignant) {
        return <div>Chargement...</div>;
    }

    return (
        <div className='flex flex-col items-center font-[Lato] w-full bg-sky-100 min-h-screen h-screen'>
            <Navbar />
            <SoignantProfile soignant={soignant} />
        </div>
    );
};

export default FindSoignant;
