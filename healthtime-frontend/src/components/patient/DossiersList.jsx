import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoDocument } from "react-icons/io5";
import DossierMedical from "../soignant/DossierMedical";

const DossiersList = () => {
    const storedUserData = JSON.parse(localStorage.getItem("userData")); 
    const back = import.meta.env.VITE_BACK_URL; // URL de votre backend

    const [dossiers, setDossiers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedDossier, setSelectedDossier] = useState(null);
    const [showDossier, setShowDossier] = useState(false);

    const handleClick = (dossier) => {
        setSelectedDossier(dossier);
        setShowDossier(true);
    };

    const goBack = () => {
        setSelectedDossier(null);
        setShowDossier(false);
    };

    const fetchDossiers = async () => {
        try {
            const response = await axios.get(`${back}/dossiers-medicaux/patient/${storedUserData.id}`);
            setDossiers(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des dossiers médicaux :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDossiers();
    }, []);

    return (
        <div className="flex flex-col w-full gap-2 py-6 px-10 items-start justify-center mt-5 h-full">
            {showDossier ? (
                <div className="w-full">
                    <DossierMedical dossier={selectedDossier} back={goBack} />
                </div>
            ) : (
                <div className="w-full">
                    <p className="flex items-center gap-1 text-xl font-semibold text-zinc-700 mb-8">
                        Mes Dossiers Médicaux
                    </p>
                    {loading ? (
                        <p>Chargement...</p>
                    ) : dossiers.length > 0 ? (
                        <div className="grid grid-cols-2 gap-10 w-full mx-auto tracking-wide">
                            {dossiers.map((dossier) => (
                                <div
                                    key={dossier.id}
                                    onClick={() => handleClick(dossier)}
                                    className="flex gap-5 items-center p-5 bg-white border border-gray-200/80 rounded text-sm hover:border-orange-300/80 hover:cursor-pointer duration-200"
                                >
                                    <span className="p-8 bg-orange-100 text-orange-500 rounded-full">
                                        <IoDocument size={40} />
                                    </span>
                                    <div className="flex flex-col">
                                        <p>
                                            <span className="text-gray-400 font-semibold">Soignant :</span>{" "}
                                            {dossier.nomSoignant} {dossier.penomSoignant}
                                        </p>
                                        <p>
                                            <span className="text-gray-400 font-semibold">Nombre de consultations :</span>{" "}
                                            {dossier.nbrConsultations}
                                        </p>
                                        <p>
                                            <span className="text-gray-400 font-semibold">Date de création :</span>{" "}
                                            {new Date(dossier.dateCreation).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <span className="text-gray-400 font-semibold">Adresse :</span>{" "}
                                            {dossier.adresse}
                                        </p>
                                        <p>
                                            <span className="text-gray-400 font-semibold">Téléphone :</span>{" "}
                                            {dossier.telephone}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Aucun dossier médical trouvé.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DossiersList;
