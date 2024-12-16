import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaRegFile } from "react-icons/fa";
import DemandModal from './DemandModal';
import ToastComponent, { showErrorToast, showSuccessToast, showWarnToast, showInfoToast } from '../ToastComponent';
import ConfirmModal from '../ConfirmModal'
const DemandsList = () => {
    const back = import.meta.env.VITE_BACK_URL
    const [demandes, setDemandes] = useState([])
    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [selectedDemand, setSelectedDemand] = useState(0)

    const [SelectedId, setSelectedId] = useState(0)
    const [confirmation, setConfirmation] = useState(null)

    useEffect(() => {
        fetchDemandes()
    }, [])

    const fetchDemandes = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${back}/soignants/demands`)
            setDemandes(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAcceptDemand = async (id) => {
        try {
            await axios.post(`${back}/auth/admin/accept/${id}`)
            fetchDemandes()
            setConfirmation(null)
            showSuccessToast('Demande acceptée avec succès!')
        } catch (error) {
            console.error(error)
            showWarnToast('Une erreur est survenue lors de l\'acceptation de la demande.')
        }
    }

    const handleRefuseDemand = async (id) => {
        try {
            await axios.post(`${back}/auth/admin/reject/${id}`)
            fetchDemandes()
            setConfirmation(null)
            showSuccessToast('Demande refusée avec succès!')
        } catch (error) {
            console.error(error)
            showWarnToast('Une erreur est survenue lors de la refus de la demande.')
        }
    }

    const handleShowModal = (demand) => {
        setSelectedDemand(demand)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedDemand(0)
    }

    const handleConfirmAction = (id, action) => {
        setSelectedId(id)
        setConfirmation(action)
    }

    const handleCloseConfirmation = () => {
        setConfirmation(null)
        setSelectedId(0)
    }

    return (
        <div className='flex justify-center items-center w-full my-5'>
            {
                loading ? (
                    <p>Chargement...</p>
                ) : (
                    demandes.length > 0 ?
                        <div className="grid grid-cols-2 w-full gap-6">
                            {demandes.map((demande) => (
                                <div className="relative flex flex-col bg-white p-3 gap-2 group rounded-md hover:scale-10 duration-300">
                                    <button className='absolute top-2 right-2 text-zinc-200 group-hover:text-zinc-500 duration-300'
                                        onClick={() => handleShowModal(demande)}>
                                        <FaRegFile />
                                    </button>
                                    <div className="flex gap-2">
                                        <div className="flex w-12 h-12 m-1 bg-orange-100 text-lg font-semibold text-orange-500 p-3 items-center justify-center rounded-full   duration-300">
                                            <p>{demande.prenom[0].toUpperCase() + demande.nom[0].toUpperCase()}</p>
                                        </div>
                                        <div className="flex flex-col text-xs tracking-wide">
                                            <p className='text-sm font-semibold text-sky-700'>{demande.nom} {demande.prenom}</p>
                                            <p >{demande.telephone}</p>
                                            <p>{demande.adresse}</p>
                                            <p>{demande.email}</p>
                                            <div className="flex gap-2 mt-2">
                                                {demande.specialites.map((specialite) => (
                                                    <span className='text-sky-600 bg-sky-100 px-2 py-1 rounded'>{specialite.nom}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="group-hover:flex justify-center items-center text-xs gap-3 mt-2 hidden">
                                        <button className='bg-orange-400 px-2 py-1 text-white rounded-sm'
                                            onClick={() => handleConfirmAction(demande.id, "accept")}>
                                            Accepter
                                        </button>
                                        <button className='text-orange-400'
                                            onClick={() => handleConfirmAction(demande.id, "refuse")}>
                                            Refuser
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div className="flex items-center gap-1 w-full py-48 justify-center text-zinc-500 text-sm">
                            <FaRegFile size={16} />
                            <p>Pas de demandes à afficher</p>
                        </div>
                )
            }
            {showModal && <DemandModal demande={selectedDemand} close={handleCloseModal} />}
            {confirmation === "accept" &&
                <ConfirmModal id={SelectedId}
                    operation={""}
                    message={"d'accepter cette demande."}
                    action={handleAcceptDemand}
                    close={handleCloseConfirmation} />
            }
            {confirmation === "refuse" &&
                <ConfirmModal id={SelectedId}
                    operation={""}
                    message={"de refuser cette demande."}
                    action={handleRefuseDemand}
                    close={handleCloseConfirmation} />
            }
            <ToastComponent />
        </div>
    )
}

export default DemandsList
