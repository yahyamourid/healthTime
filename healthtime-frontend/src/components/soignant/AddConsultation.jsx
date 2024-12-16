import React, { useState } from 'react';
import { getFormattedDate } from "../../utils/DateUtils"
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader'

const AddConsultation = ({ dossier, reload, showSuccess, showError, close }) => {
    const baseUrl = import.meta.env.VITE_BACK_URL;
    const [loading, setLoading] = useState(false);
    const [consultation, setConsultation] = useState({
        // id: 0,
        type: dossier.consultations.length > 0 ? 'Contrôle' : 'Premiere consultation',
        dateConsultation: getFormattedDate(),
        compteRendu: '',
        analyses: [],
        ordonnances: [
            { medicament: '', dose: 1, methode: 'Avant', commentaire: '' }
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConsultation({ ...consultation, [name]: value });
    };

    const handleAddAnalyse = () => {
        setConsultation({
            ...consultation,
            analyses: [...consultation.analyses, { nom: '' }]
        });
    };

    const handleRemoveAnalyse = (index) => {
        setConsultation({
            ...consultation,
            analyses: consultation.analyses.filter((_, i) => i !== index)
        });
    };

    const handleAnalyseChange = (index, value) => {
        const updatedAnalyses = consultation.analyses.map((analyse, i) => (
            i === index ? { nom: value } : analyse
        ));
        setConsultation({ ...consultation, analyses: updatedAnalyses });
    };

    const handleAddOrdonnance = () => {
        setConsultation({
            ...consultation,
            ordonnances: [
                ...consultation.ordonnances,
                { medicament: '', dose: 0, methode: 'Avant', commentaire: '' }
            ]
        });
    };

    const handleRemoveOrdonnance = (index) => {
        setConsultation({
            ...consultation,
            ordonnances: consultation.ordonnances.filter((_, i) => i !== index)
        });
    };

    const handleOrdonnanceChange = (index, field, value) => {
        const updatedOrdonnances = consultation.ordonnances.map((ordonnance, i) => (
            i === index ? { ...ordonnance, [field]: value } : ordonnance
        ));
        setConsultation({ ...consultation, ordonnances: updatedOrdonnances });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(consultation);
        try {
            setLoading(true);
            const response = await axios.post(`${baseUrl}/consultations/${dossier.id}`,consultation)
            setTimeout(() => {
                reload()
                setLoading(false);
                close()
                showSuccess('Consultation ajoutée avec succès');
            }, 2500);

        } catch (error) {
            setTimeout(() => {
                console.log(error);
                showError('Erreur lors de l\'ajout de la consultation')
                setLoading(false);
            }, 2000);
        }

        // onSubmit(consultation);
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800  bg-opacity-50 flex items-center justify-center ">

            <div className="flex flex-col relative justify-center px-6 py-3 bg-white max-h-5/6 w-5/6 rounded-md" >
                <button className='absolute top-2 right-2 ' onClick={close}>
                    <IoClose size={20} />
                </button>
                <div className="flex w-full h-1/3 p-2">
                    <div className='flex flex-col w-full h-full'>
                        <p className='text-xl text-gray-700 font-semibold tracking-wide mb-2'>Détails de la Consultation</p>
                        <div className="flex gap-3 text-sm w-full h-full">
                            <div className="flex flex-col w-1/4 ">
                                <label className='flex text-gray-700 text-xs font-bold mb-0.5'>Type:</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={consultation.type}
                                    onChange={handleInputChange}
                                    className='appearance-none border-gray-200 text-xs mb-2 bg-seaSalt text-gray-500 rounded w-full py-2 px-3 focus:ring-0 focus:border focus:border-gray-400'
                                    disabled
                                />

                                <label className='flex text-gray-700 text-xs font-bold mb-0.5'>Date:</label>
                                <input
                                    type="datetime-local"
                                    name="dateConsultation"
                                    value={consultation.dateConsultation}
                                    onChange={handleInputChange}
                                    className='appearance-none border-gray-200 text-xs bg-seaSalt text-gray-500 rounded w-full py-2 px-3 focus:ring-0 focus:border focus:border-gray-400'
                                    disabled
                                />
                            </div>

                            <div className="flex flex-col w-3/4 h-full">
                                <label className='flex text-gray-700 text-xs font-bold mb-0.5'>Compte Rendu:</label>
                                <textarea
                                    name="compteRendu"
                                    value={consultation.compteRendu}
                                    onChange={handleInputChange}
                                    className='appearance-none border-gray-200 text-xs bg-seaSalt text-gray-500 h-full mb-5 rounded w-full py-2 px-3 focus:ring-0 focus:border focus:border-gray-400'

                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex h-2/3 w-full gap-3">
                    <div className="w-3/5 p-2 gap-3  max-h-72 overflow-y-auto rounded-b-md px-4 py-2 scrollbar scrollbar-thumb-sky-500 scrollbar-track-transparent">
                        <div className="flex items-center mb-3">
                            <p className='text-xl text-gray-700 font-semibold tracking-wide '>Ordonnances</p>
                            <button
                                type="button"
                                onClick={handleAddOrdonnance}
                                className="flex gap-1 items-center mt-1 ml-auto text-sky-500 text-sm"
                            >
                                <IoIosAdd />
                                <p>Ajouter un Médicament</p>
                            </button>
                        </div>
                        {consultation.ordonnances.map((ordonnance, index) => (
                            <div key={index} className="flex items-center gap-3 w-full mb-3">
                                <input
                                    type="text"
                                    placeholder="Médicament"
                                    value={ordonnance.medicament}
                                    onChange={(e) => handleOrdonnanceChange(index, 'medicament', e.target.value)}
                                    className='appearance-none w-2/5 border-gray-200 text-xs bg-seaSalt text-gray-500 rounded py-2 px-3 focus:ring-0 focus:border focus:border-gray-400'
                                />
                                <input
                                    type="number"
                                    placeholder="Dose"
                                    value={ordonnance.dose}
                                    onChange={(e) => handleOrdonnanceChange(index, 'dose', e.target.value)}
                                    className='appearance-none w-1/10 border-gray-200 text-xs bg-seaSalt text-gray-500 rounded  py-2 px-3 focus:ring-0 focus:border focus:border-gray-400'
                                />
                                <div className="flex gap-2 w-2/5 text-xs">
                                    <button
                                        onClick={() => handleOrdonnanceChange(index, 'methode', 'Avant')}
                                        className={`border w-1/2 px-4 py-2 rounded ${ordonnance.methode === 'Avant' ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                                    >
                                        Avant
                                    </button>
                                    <button
                                        onClick={() => handleOrdonnanceChange(index, 'methode', 'Après')}
                                        className={`border w-1/2 px-4 py-2 rounded ${ordonnance.methode === 'Après' ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                                    >
                                        Après
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveOrdonnance(index)}
                                    className="text-red-500 w-1/10 hover:text-red-600 duration-200 hover:scale-105"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}

                    </div>
                    <div className="w-2/5 p-2  max-h-72 overflow-y-auto rounded-b-md px-4 py-2 scrollbar scrollbar-thumb-sky-700 scrollbar-track-transparent">
                        <div className="flex items-center mb-3">
                            <p className='text-xl text-gray-700 font-semibold tracking-wide'>Analyses</p>
                            <button
                                type="button"
                                onClick={handleAddAnalyse}
                                className="flex gap-1 items-center mt-1 ml-auto text-sky-500 text-sm"
                            >
                                <IoIosAdd />
                                Ajouter une Analyse
                            </button>
                        </div>
                        {consultation.analyses.map((analyse, index) => (
                            <div key={index} className="flex items-center mb-2 gap-3">
                                <input
                                    type="text"
                                    value={analyse.nom}
                                    onChange={(e) => handleAnalyseChange(index, e.target.value)}
                                    className='appearance-none w-full border-gray-200 text-xs bg-seaSalt text-gray-500 rounded py-2 px-3 focus:ring-0 focus:border focus:border-gray-400'
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveAnalyse(index)}
                                    className="text-red-500 w-1/10 hover:text-red-600 duration-200 hover:scale-105"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}

                    </div>
                </div>

                <button onClick={handleSubmit} className={`flex items-center justify-center mt-4 w-1/3 mx-auto  text-white p-2 rounded  duration-300 ${loading ? 'bg-sky-400 cursor-not-allowed':'bg-sky-500 hover:bg-sky-400'} `}
                disabled={loading}>
                    {loading ?
                        <span className="flex  items-center gap-1">
                            <PulseLoader size={8} color="#ffffff" />
                            <p>Enregistrement</p>
                        </span>
                        :
                        <p>Enregistrer la Consultation</p>
                    }
                </button>
            </div>
        </div>
    );
};

export default AddConsultation;
