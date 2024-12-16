import React, { useState } from 'react'
import AddConsultation from './AddConsultation';
import { IoIosAdd } from "react-icons/io";
import ToastComponent, { showSuccessToast, showErrorToast } from '../ToastComponent';
const Consultations = ({ dossier, fetchdata }) => {
    // console.log(dossier.consultations);
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    const [showConsultations, setShowConsultations] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseModal = () => {
        setShowAddModal(false)
    }
    return (
        <div>
            <div className="bg-white rounded-lg mb-6 p-4">
                <div className="flex justify-between items-center px-2">
                    <button
                        onClick={() => setShowConsultations(!showConsultations)}
                        className=""
                    >
                        <p className="text-lg font-semibold text-sky-400">Consultations</p>
                    </button>
                    {
                        storedUserData.role == "SOIGNANT" && 
                        <button className='flex gap-1 items-center justify-center text-sm bg-sky-400 px-2 py-1 text-white rounded-sm'
                            onClick={() => setShowAddModal(true)}                        >
                            <IoIosAdd size={20} />
                            <p>Ajouter</p>
                        </button>
                    }
                </div>
                {showConsultations && (
                    <div className="mt-4 px-3">
                        {dossier.consultations.length > 0 ? (
                            dossier.consultations.slice().reverse().map((consultation) => (
                                <div key={consultation.id} className="p-3 mb-4 bg-gray-50 rounded text-sm">
                                    <p className="font-semibold text-gray-700 first-letter:uppercase">
                                        {consultation.type} -{" "}
                                        {new Date(consultation.dateConsultation).toLocaleDateString() + " - " + new Date(consultation.dateConsultation).toLocaleTimeString()}
                                    </p>
                                    <p className="text-gray-600">{consultation.compteRendu}</p>

                                    {/* Ordonnances */}
                                    <div className="mt-2">
                                        <p className="font-semibold text-green-500">Ordonnances :</p>
                                        <ul className="list-disc pl-5 text-gray-600">
                                            {consultation.ordonnances.map((ordonnance) => (
                                                <li key={ordonnance.id}>
                                                    <span className="font-semibold">{ordonnance.medicament}</span> -{" "}
                                                    {ordonnance.dose + " fois " + ordonnance.methode + " le repas"}
                                                    {/* <span className="italic text-gray-500">
                                                        ({ordonnance.commentaire})
                                                    </span> */}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Analyses */}
                                    <div className="mt-2">
                                        <p className="font-semibold text-green-500">Analyses :</p>
                                        <ul className="list-disc pl-5 text-gray-600">
                                            {consultation.analyses.map((analyse) => (
                                                <li key={analyse.id}>{analyse.nom}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">Aucune consultation disponible.</p>
                        )}
                    </div>
                )}

            </div>
            {showAddModal && <AddConsultation dossier={dossier} close={handleCloseModal} reload={fetchdata} showSuccess={showSuccessToast} showError={showErrorToast} />}
            <div className="text-sm">
                <ToastComponent />
            </div>
        </div>
    )
}

export default Consultations
