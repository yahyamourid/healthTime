import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import ToastComponent, { showSuccessToast, showErrorToast } from '../ToastComponent';
import ConfirmModal from "../ConfirmModal";
const RendezVousList = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const back = import.meta.env.VITE_BACK_URL
    const [rendezVous, setRendezVous] = useState([]);
    const [filteredRendezVous, setFilteredRendezVous] = useState([]);
    const [filter, setFilter] = useState("tous");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0)

    const fetchData = async () => {
        await axios
        .get(`${back}/rendezvous/patient/${storedUserData.id}`)
        .then((response) => {
            setRendezVous(response.data);
            setFilteredRendezVous(response.data);
        })
        .catch((error) => console.error("Erreur lors du chargement des rendez-vous :", error));
    }
    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        if (filter === "tous") {
            setFilteredRendezVous(rendezVous);
        } else {
            setFilteredRendezVous(rendezVous.filter((rv) => rv.etat === filter));
        }
    }, [filter, rendezVous]);

    const handleCancel = async (id) => {
        await axios
            .put(`${back}/rendezvous/cancel/${id}`)
            .then(() => {
                setRendezVous((prev) =>
                    prev.map((rv) =>
                        rv.id === id ? { ...rv, etat: "annule" } : rv
                    )
                );
                handleCloseModal()
                showSuccessToast("Rendez-vous annulé avec succès !");
            })
            .catch((error) => showErrorToast("Erreur lors de l'annulation :", error));
    };

    const handleOpenModal = (id) => {
        setSelectedId(id)
        setShowConfirmModal(true);
    }

    const handleCloseModal = () => {
        setSelectedId(0)
        setShowConfirmModal(false);
    }


    return (
        <div className="p-4 w-full">
            <p className="text-xl font-bold mb-4">Liste des Rendez-vous</p>

            {/* Filter Buttons */}
            <div className="flex gap-4 mb-6 text-sm mx-auto w-full justify-center">
                {["tous", "en-cours", "fait", "annule"].map((state) => (
                    <button
                        key={state}
                        className={`px-6 py-1.5 rounded ${filter === state
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => setFilter(state)}
                    >
                        {state.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Rendez-vous List */}
            <div className="grid grid-cols-2 gap-4">
                {filteredRendezVous.length > 0 ? (
                    filteredRendezVous.map((rv) => (
                        <div
                            key={rv.id}
                            className={`p-4 rounded-r bg-white border border-white ${rv.etat === "en-cours"
                                ? "border-l-4 border-l-yellow-500 hover:border-l-4 hover:border-yellow-500 duration-200"
                                : rv.etat === "fait"
                                    ? "border-l-4 border-l-green-500 hover:border-l-4 hover:border-green-500 duration-200"
                                    : rv.etat === "annule"
                                        ? "border-l-4 border-l-red-500 hover:border-l-4 hover:border-red-500 duration-200"
                                        : "bg-gray-100"
                                }`}
                        >
                            <div className="relative flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold">
                                        <span>Dr.</span> {rv.nomSoignant} {rv.prenomSoignant}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Date : {new Date(rv.dateRendez).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-500">Adresse : {rv.adresse}</p>
                                    <p className="text-sm text-gray-500">Téléphone : {rv.telephone}</p>
                                </div>
                                {/* Cancel Button for "en-cours" */}
                                {rv.etat === "en-cours" && (
                                    <button
                                        className="absolute flex items-center justify-start gap-1 top-1 right-1 duration-200 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                                        onClick={() => handleOpenModal(rv.id)}
                                    >
                                        <MdCancel />
                                        <p>Annuler</p>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Aucun rendez-vous à afficher.</p>
                )}
            </div>
            <div className="text-sm">
                <ToastComponent />
            </div>
            {showConfirmModal && <ConfirmModal
                id={selectedId}
                action={handleCancel}
                close={handleCloseModal}
                message={"annuler ce rendezVous"}
                operation={"Annulation"}
            />}
        </div>
    );
};

export default RendezVousList;
