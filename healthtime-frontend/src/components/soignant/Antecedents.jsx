import React, { useState } from 'react'

const Antecedents = ({dossierMedical}) => {
    const [showAntecedents, setShowAntecedents] = useState(true);
  return (
    <div>
       {/* Section Antécédents */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">Antécédents Médicaux et Chirurgicaux</p>
          <button
            onClick={() => setShowAntecedents(!showAntecedents)}
            className="text-blue-500 underline"
          >
            {showAntecedents ? "Masquer" : "Afficher"}
          </button>
        </div>
        {showAntecedents && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Antécédents Médicaux :</h4>
            {dossierMedical.antecedentMedicals.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-600">
                {dossierMedical.antecedentMedicals.map((ant, index) => (
                  <li key={index}>{ant}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aucun antécédent médical enregistré.</p>
            )}
            <h4 className="font-medium text-gray-700 mt-4">Antécédents Chirurgicaux :</h4>
            {dossierMedical.antecedentChirurgicals.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-600">
                {dossierMedical.antecedentChirurgicals.map((ant, index) => (
                  <li key={index}>{ant}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aucun antécédent chirurgical enregistré.</p>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

export default Antecedents
