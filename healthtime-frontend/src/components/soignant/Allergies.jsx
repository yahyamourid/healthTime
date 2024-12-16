import React, { useState } from 'react'

const Allergies = ({allergies}) => {
  const [showAllergies, setShowAllergies] = useState(true);
  return (
    <div>
      {/* Section Allergies */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">Allergies</p>
          <button
            onClick={() => setShowAllergies(!showAllergies)}
            className="text-blue-500 underline"
          >
            {showAllergies ? "Masquer" : "Afficher"}
          </button>
        </div>
        {showAllergies && (
          <div className="mt-4">
            {allergies.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-600">
                {dossierMedical.allergies.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aucune allergie enregistrée.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Allergies
