import React, { useState } from "react";
import axios from "axios";
const EditAnalyseModal = ({ analyse, close, fetchdata, showError, showSuccess }) => {
    const baseUrl = import.meta.env.VITE_BACK_URL;
    const [valeur, setValeur] = useState(analyse.valeur);
    const [unite, setUnite] = useState(analyse.unite);

    const handleSave = async () => {
        try {
            const response = await axios.put(`${baseUrl}/analyses/${analyse.id}`, {
                valeur,
                unite,
            });

            showSuccess("Analyse modifiée avec succès.");
            fetchdata();
            close();

        } catch (error) {
            console.log(error);
            showError("Erreur lors de la modification de l'analyse");
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex flex-col text-xs items-center w-1/3 justify-center bg-white p-5 rounded-md shadow-md">
                <p className='text-lg font-semibold text-gray-700'>Modifier l'analyse</p>
                <div className="flex items-center justify-center gap-10 my-2 w-full">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Valeur</label>
                        <input
                            type="number"
                            value={valeur}
                            onChange={(e) => setValeur(e.target.value)}
                            className='appearance-none border-gray-200 text-xs mb-2 bg-seaSalt text-gray-500 rounded w-full py-2 px-3 focus:ring-0 focus:border focus:border-gray-400'
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Unité</label>
                        <input
                            type="text"
                            value={unite}
                            onChange={(e) => setUnite(e.target.value)}
                            className='appearance-none border-gray-200 text-xs mb-2 bg-seaSalt text-gray-500 rounded w-full py-2 px-3 focus:ring-0 focus:border focus:border-gray-400'
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        className="px-4 py-2 text-sm text-blue-500 rounded hover:bg-gray-300"
                        onClick={close}
                    >
                        Annuler
                    </button>
                    <button
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleSave}
                    >
                        Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditAnalyseModal;
