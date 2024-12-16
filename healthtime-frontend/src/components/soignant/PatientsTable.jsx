import React, { useState, useEffect } from "react";
import axios from "axios";
import DossierMedical from "./DossierMedical";
const PatientsTable = () => {
    const back = import.meta.env.VITE_BACK_URL
    const soignantId = JSON.parse(localStorage.getItem('userData')).id
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedDossier, setSelectedDossier] = useState(null);
    const [showDossier, setShowDossier] = useState(false)

    const handleClick = (dossier) => {
        setSelectedDossier(dossier);
        setShowDossier(true);
    }

    const goBack = () => {
        setSelectedDossier(null);
        setShowDossier(false);
    }

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${back}/dossiers-medicaux/soignant/${soignantId}`
                );
                setMedicalRecords(response.data);
                // console.log(response.data);

                setFilteredRecords(response.data);
                setLoading(false);
            } catch (err) {
                setError("Erreur lors du chargement des dossiers médicaux.");
                setLoading(false);
            }
        };

        fetchMedicalRecords();
    }, [soignantId]);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredRecords(medicalRecords);
        } else {
            const filtered = medicalRecords.filter(
                (record) =>
                    record.nomPatient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    record.prenomPatient.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRecords(filtered);
        }
    }, [searchTerm, medicalRecords]);

    return (
        <div className="container mx-auto p-8">
            {showDossier ?
                <DossierMedical dossier={selectedDossier} back={goBack} />
                :
                <div>
                    <h1 className="text-xl font-bold mb-4">Liste des Dossiers Médicaux</h1>

                    {/* Barre de recherche */}
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou prénom du patient..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 mb-4 w-1/3"
                    />

                    {/* Indicateur de chargement */}
                    {loading && <p>Chargement des dossiers médicaux...</p>}

                    {/* Gestion des erreurs */}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Liste des dossiers médicaux */}
                    {!loading && !error && (
                        <div className="flex flex-col text-sm mt-4">
                            <div className="flex items-center justify-center w-full bg-gray-100 border text-gray-600">
                                <p className="px-4 py-2 w-1/6 text-center">Nom du Patient</p>
                                <p className="px-4 py-2 w-1/6 text-center">Prénom du Patient</p>
                                <p className="px-4 py-2 w-1/6 text-center">Sexe</p>
                                <p className="px-4 py-2 w-1/6 text-center">Telephone</p>
                                <p className="px-4 py-2 w-1/6 text-center">Nbr Consultations</p>
                                <p className="px-4 py-2 w-1/6 text-center">Date de Création</p>
                            </div>
                            <div>
                                {filteredRecords.length > 0 ? (
                                    filteredRecords.map((record) => (
                                        <div key={record.id} className="flex items-center justify-center w-full bg-white border-t text-gray-900 hover:bg-sky-100 hover:cursor-pointer"
                                        onClick={() => handleClick(record)}>
                                            <p className="px-4 py-2 w-1/6 text-center">{record.nomPatient}</p>
                                            <p className="px-4 py-2 w-1/6 text-center">{record.prenomPatient}</p>
                                            <div className="px-12 py-2 w-1/6 text-center">
                                                <p className={` py-0.5 text- rounded-2xl ${record.sexe == "homme" ? 'bg-sky-200 text-sky-600' : 'bg-pink-100 text-pink-600'}`}>
                                                    {record.sexe}
                                                </p>
                                            </div>
                                            <p className="px-4 py-2 w-1/6 text-center">{record.telephone}</p>
                                            <p className="px-4 py-2 w-1/6 text-center">{record.nbrConsultations}</p>
                                            <p className="px-4 py-2 w-1/6 text-center">{record.dateCreation}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <p
                                            colSpan="4"
                                            className="text-center  px-4 py-2 text-gray-500"
                                        >
                                            Aucun dossier médical trouvé.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            }
        </div>
    );
};

export default PatientsTable;
